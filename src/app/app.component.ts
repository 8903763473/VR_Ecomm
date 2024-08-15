import { Component, HostListener, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent implements OnInit{
  constructor(private renderer: Renderer2) {}
  successPopup:boolean=false
  failedpopup:boolean=false
  warningpopup:boolean=false

  ngOnInit(): void {
this.loadScripts()
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


}

