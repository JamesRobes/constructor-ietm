import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class TestsServiceService {

  private apiUrl: string = environment.baseUrl;

  constructor(private http: HttpClient) { }

  getTestsByRepoID(repoID: string): Observable<any>
  {
    return this.http.get(`${this.apiUrl}/repository/tests/all/${repoID}`, {
      withCredentials: true,
    });
  }

  // createTest(testBody: TestI): Observable<any>
  // {
  //   return this.http.post(`${this.apiUrl}/repository/tests/create`, testBody ,{
  //     withCredentials: true
  //   });
  // }
}
