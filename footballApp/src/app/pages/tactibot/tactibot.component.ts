import { Component } from '@angular/core';
import { Gpt3Service } from 'src/app/services/gpt3.service';
import { FormControl } from '@angular/forms';  // Importa FormControl

@Component({
  selector: 'app-tactibot',
  templateUrl: './tactibot.component.html',
  styleUrls: ['./tactibot.component.scss']
})
export class TactibotComponent {
  userInput = new FormControl(''); // Usa FormControl aquí
  responseText = '';  // Almacenar la respuesta de GPT-3

  constructor(private gpt3Service: Gpt3Service) {}

  sendMessage() {
    const input = this.userInput.value; // Usa el valor de FormControl
    if (input) {
      this.gpt3Service.getResponse(input).subscribe(
        response => {
          if (response && response.choices.length > 0) {
            this.responseText = response.choices[0].text;
          } else {
            this.responseText = "No se recibió una respuesta válida.";
          }
        },
        error => {
          console.error("Error calling GPT-3:", error);
          this.responseText = "Hubo un error al procesar tu solicitud.";
        }
      );
      this.userInput.setValue(''); // Limpia el FormControl después de enviar
    }
  }
}
