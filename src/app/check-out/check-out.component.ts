import { Component, OnInit } from '@angular/core';
import { ServiceService } from '../service.service';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-check-out',
  templateUrl: './check-out.component.html',
  styleUrls: ['./check-out.component.scss'],
})
export class CheckOutComponent  implements OnInit {
  Name:any
  email:any;
  Company:any
  country:any
  phone:any;
  zipcode:any
  // state:any
  city:any;
  street1:any
  street2:any
  state: string = ''; 
  Id:any
  cartproduct:any=[]
  cartTotal: number = 0;
  paymentValue:any=[]
  constructor(public api:ServiceService) { }

  ngOnInit() {
    this.Id = localStorage.getItem('userId');
    this.getcartproduct()
  }


  getcartproduct() {
    let post = {
      "userId": this.Id
    }
    this.api.GetCart(post).subscribe({
      next: (res: any) => {
        this.cartproduct = res;
        console.log(this.cartproduct);
        this.calculateTotal();
      },
      error: (err) => {
        console.error('Error fetching cart products:', err);
      }
    });
  }
  calculateTotal() {
    this.cartTotal = this.cartproduct.items.reduce((accumulator: any, item: any) => {
      return accumulator + item.productCurrentRate * item.quantity;
    }, 0);
  }


  submitLogin(){
    let post={
      // "name":this.Name,
      // "email":this.email,
      // "company":this.Company,
      // "country":"Germany",
      // "phone":this.phone,
      // "zipcode":this.zipcode,
      // "state":"Georgia",
      // "city":this.city,
      // "street1":this.street1,
      // "street2":this.street2
       "amount": this.cartTotal,
  	   "currency": "INR"
    }
    console.log(post);
    this.api.CreateOrder(post).subscribe({
      next:(res=>{
        console.log(res);
        this.payWithRazorpay() 
      })
    })
  }

  order:any=[]
  async payWithRazorpay() {
    const amount = this.cartTotal * 100; // Amount in paise (smallest currency unit)
    const currency = 'INR';

    try {
      // Call your backend to create an order
       this.order = await this.api.CreateOrder({ amount, currency }).toPromise();

      const options = {
        key: 'rzp_test_kpCe8bslVbEfVQ', 
        "amount": this.order.amount,
        "currency": this.order.currency,
        "name": "Your Company Name",
        "description": "Test Transaction",
        "image": "/your_logo.png",
        "order_id": this.order.id,
        "handler": (response:any) => {
          console.log('Razorpay Payment Successful', response);
          this.verifyPayment(response);
        },
        prefill: {
          name: this.Name,
          email: this.email,
          contact: this.phone,
        },
        notes: {
          address: 'Corporate Office',
        },
        theme: {
          color: '#3399cc',
        },
      };

      const razorpay = new (window as any).Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error('Order creation failed', error);
    }
  }


  verifyPayment(paymentResponse: any) {
    console.log(paymentResponse);
    this.api.VerifyPayment(paymentResponse).subscribe({
      next:(res=>{
        this.checkoutProduct()
        console.log('Payment verification successful', res);
      })
    })
  }
  checkoutProduct() {
    let productsArray = this.cartproduct.items.map((item: any) => {
      return {
        productId: item.productId,
        quantity: item.quantity,
        price: item.productCurrentRate,
      };
    });
  
    let post = {
      userId: this.Id,
      name: this.Name,
      email: this.email,
      country: "France",
      street: this.street1 + ' ' + this.street2,
      city: this.city,
      state: "New York",  // Use actual state value if available
      zipCode: this.zipcode,
      phone: this.phone,
      orderNotes: "Please deliver between 9 AM and 12 PM.",
      products: productsArray,
    };
  
    this.api.CheckOutProduct(post).subscribe({
      next: (res) => {
        console.log(res);
      },
      error: (err) => {
        console.error('Error processing checkout:', err);
      },
    });
  }
  
}
