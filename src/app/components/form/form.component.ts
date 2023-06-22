import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { encriptarCampo, enmascararValor } from '../../utils/forge.all.min.js';
import { PublicKey } from 'src/app/interfaces/key';
import { EncriptService } from '../../services/encript/encript.service';
import { PublicKeyExample } from '../../keys/public.key';
import { Flujo, Formulario, Result } from '../../interfaces/formulario';
import { GlobalDataService } from 'src/app/services/data/global-data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit {

  mostrarModal: boolean = false;
  appForm!: FormGroup;
  result: Result = {
    exitoso: false,
    mensaje: ''
  };

  private publicKey: PublicKey = PublicKeyExample;

  private formulario: Formulario = {
    flujo: Flujo.Formulario,
    name: '',
    documentoCifrado: ''
  };

  private documentoCifrado: string = '';

  constructor(
    private readonly fb: FormBuilder,
    private encriptService: EncriptService,
    private globalDataService: GlobalDataService,
    private router: Router
  ) {
    this.appForm = new FormGroup({
      name: new FormControl(''),
      documentNumber: new FormControl(''),
      documentoCifrado: new FormControl('')
    });
  }

  ngOnInit(): void {
    this.appForm = this.initForm();
    this.publicKey = this.globalDataService.getPublicKey();
    if (this.publicKey == PublicKeyExample) {
      this.router.navigate([`/`]);
    }
    this.globalDataService.onAceptar().subscribe(() => {
      this.mostrarModal = false;
    });
  }

  async onSubmit(): Promise<void> {
    if (this.appForm.get('documentoCifrado')?.value === '') {
      await this.encriptAndHideNumber('documentNumber');
    }
    this.formulario.documentoCifrado = this.documentoCifrado;
    this.formulario.name = this.appForm.get('name')?.value;
    console.log(this.formulario.documentoCifrado);
    this.sendForm(this.formulario);
  }

  initForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required]],
      documentNumber: ['', [Validators.required]],
      documentoCifrado: [''],
    })
  }

  async encriptAndHideNumber(campo: string): Promise<void> {
    if (this.appForm.get(campo)?.touched) {
      if (this.publicKey) {
        const valorLlavePublica = this.publicKey.publicKey;
        const value = this.appForm.get(campo)?.value.slice();
        this.documentoCifrado = await encriptarCampo(value, 'documentoCifrado', valorLlavePublica);
        await enmascararValor(campo, 2);
      } else {
        console.log('this.publicKey no está definido');
        this.loadData();
      }
    }
  }

  clearInput(campo: string) {
    this.appForm.get(campo)?.patchValue('');
  }

  loadData() {
    this.encriptService.getKey()
      .subscribe(publicKey => {
        this.publicKey = publicKey;
      });
  }

  private async sendForm(formulario: Formulario) {
    await this.encriptService.sendForm(formulario)
      .subscribe(result => {
        this.result = result;
        this.abrirModal();
      });
  }

  abrirModal(): void {
    this.mostrarModal = true;
  }

  closeModal(): void {
    this.mostrarModal = false;
  }
}
