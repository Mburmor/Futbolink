import { Component } from '@angular/core';
import { GPT3Response } from '../../models/gpt3-response';
import { Gpt3Service } from 'src/app/services/gpt3.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-tactibot',
  templateUrl: './tactibot.component.html',
  styleUrls: ['./tactibot.component.scss'],

})
export class TactibotComponent {
  userInput = '';
  responseText = '';  // Almacenar la respuesta de GPT-3

  constructor(private gpt3Service: Gpt3Service) {}

  sendMessage() {
    if (this.userInput) {
      this.gpt3Service.getResponse(this.userInput).subscribe(
        (response: GPT3Response) => {
          if (response && response.choices.length > 0) {
            this.responseText = response.choices[0].text;
          } else {
            this.responseText = "No se recibió una respuesta válida.";
          }
        },
        (error: any) => {  // Aquí especificamos que error es de tipo 'any'
          console.error("Error calling GPT-3:", error);
          this.responseText = "Hubo un error al procesar tu solicitud.";
        }
      );
      this.userInput = ''; // Limpia el input después de enviar
    }
  }
}  
