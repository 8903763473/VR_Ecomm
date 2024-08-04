import { AfterViewInit, Component, OnInit, Renderer2 } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss'],
})
export class AboutComponent  implements AfterViewInit {

  constructor(private renderer: Renderer2) {}

  ngAfterViewInit() {
    this.loadScripts();
  }

  private loadScripts() {
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
