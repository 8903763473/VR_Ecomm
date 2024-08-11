import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';
import Swiper from 'swiper';
import * as $ from 'jquery';
import { ServiceService } from '../service.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements AfterViewInit {
  sliderInit3: any;
  category:any=[]
  constructor(private renderer: Renderer2,public api:ServiceService) {}

  ngAfterViewInit() {
    this.loadScripts();
    this.getcategory()
  }

   loadScripts() {
    const scripts = [
      'assets/js/jquery-3.7.1.min.js',
      'assets/js/bootstrap.min.js',
      'assets/js/swiper-bundle.min.js',
      'assets/js/jquery.counterup.min.js',
      'assets/js/nice-select.min.js',
      'assets/js/pace.min.js',
      'assets/js/isotope.pkgd.min.js',
      'assets/js/script.js'
    ];

    this.loadScriptSequentially(scripts);
  }

  private loadScriptSequentially(scripts: string[]) {
    if (scripts.length === 0) return;

    const script = this.renderer.createElement('script');
    script.src = scripts[0];
    script.type = 'text/javascript';
    script.async = true;

    script.onload = () => {
      this.loadScriptSequentially(scripts.slice(1));
    };

    script.onerror = () => {
      console.error(`Failed to load script: ${scripts[0]}`);
      this.loadScriptSequentially(scripts.slice(1));
    };

    this.renderer.appendChild(document.body, script);
  }

// GetCategory

getcategory() {
  this.api.GetCategory().subscribe({
    next: (res) => {  
      console.log(res);
      this.category=res
    },
    error: (err) => {
      console.error('Error fetching categories:', err);
    }
  });
}


}
