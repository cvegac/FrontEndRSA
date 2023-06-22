import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Flujo, FormWithOnlyFlujo } from 'src/app/interfaces/formulario';
import { PublicKey } from 'src/app/interfaces/key';
import { PublicKeyExample } from 'src/app/keys/public.key';
import { EncriptService } from 'src/app/services/encript/encript.service';
import { GlobalDataService } from 'src/app/services/data/global-data.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  private formWithOnlyFlujo: FormWithOnlyFlujo = {
    flujo: Flujo.Inicio
  };

  constructor(
    private encriptService: EncriptService,
    private globalDataService: GlobalDataService,
    private router: Router
  ) { }

  async ngOnInit(): Promise<void> {
    await this.cargarData();
    await this.sendEscenario();
  }

  private async cargarData() {
    await this.encriptService.getKey()
      .subscribe(publicKey => {
        this.globalDataService.setPublicKey(publicKey);
      });
  }

  private async sendEscenario() {
    await this.encriptService.sendEscenarioInicial()
      .subscribe(formWithOnlyFlujo => {
        console.log(this.formWithOnlyFlujo);
        this.router.navigate([`/${formWithOnlyFlujo.flujo}`]);
      });
  }
}
