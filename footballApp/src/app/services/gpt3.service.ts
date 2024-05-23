// src/app/services/gpt3.service.ts
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { GPT3Response } from '../models/gpt3-response'; // Asegúrate de que la ruta de importación es correcta

@Injectable({
  providedIn: 'root'
})
export class Gpt3Service {
  private baseURL = 'https://api.openai.com/v1/engines/davinci-codex/completions';

  constructor(private http: HttpClient) {}

  getResponse(prompt: string): Observable<GPT3Response> {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer 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`
    });

    const body = {
      prompt: prompt,
      max_tokens: 150
    };

    return this.http.post<GPT3Response>(this.baseURL, body, { headers: headers });
  }
}
