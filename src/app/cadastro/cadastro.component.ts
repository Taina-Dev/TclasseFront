import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CadastroService } from '../services/cadastro.service';
import { ToastrService } from 'ngx-toastr';
import { Cadastro } from '../models/cadastro';
import { NgForm } from '@angular/forms';


@Component({
  selector: 'app-cadastro',
  templateUrl: './cadastro.component.html',
  styleUrls: ['./cadastro.component.scss']
})
export class CadastroComponent implements OnInit {

  public cadastros: any = [];
  filter: string = '';
  filterTwo: string ='';

  constructor(private http: HttpClient,
    public cadastroService: CadastroService,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.cadastroService.refresh();
    this.getCadastro();
  }

  public getCadastro(){
    this.http.get('https://localhost:7052/api/ClassTainas').subscribe(
      (response) => {
        this.cadastros = response;
      },
      (error) => console.log(error)
    );
  }

  /* atualizarRegistro */
  atualizarRegistro(form: NgForm) {
    this.cadastroService.putCadastro().subscribe(
      (res: any) => {
        this.getCadastro();
        this.resetForm(form);
        this.toastr.info(' Editado com sucesso.');
      },
      (error) => {
        if (error.status == 400) {
          console.log(error);
          this.toastr.error(error.error);
        }
      }
    );
  }

 /*  salvar */
  salvarRecord(form: NgForm) {
    this.cadastroService.postCadastro().subscribe(
      (res: any) => {
        this.getCadastro();
        this.resetForm(form);
        this.toastr.success(
          '',
          'Cadastrado com sucesso!'
        );
      },
      (error) => {
        if (error.status == 400) {
          console.log(error);
          this.toastr.error(
            '',
            "Atenção a Descrição não está preenchida"
          );
        }
      }
    );
  }

  resetForm(form: NgForm) {
    form.form.reset();
    this.cadastroService.formData = new Cadastro();
  }

  /*  no botão editar */
  clicarPreecher(cadastro: Cadastro) {
    this.cadastroService.formData = Object.assign({}, cadastro);
  }

   /*  deletar registro */
   excluir(id: number) {
    if (confirm('Atenção deseja Apagar este registro?')) {
      this.cadastroService.deleteCadastro(id).subscribe(
        res => {
          this.getCadastro();
          this.toastr.error('Registro Apagado com sucesso');
        },
        (error) => {
          if (error.status == 400) {
            console.log(error);
            this.toastr.error(error.error);
          }
        }
      )
    }
  }

}
