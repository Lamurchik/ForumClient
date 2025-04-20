import { HttpClient, HttpClientModule } from "@angular/common/http";
import { Component } from "@angular/core";
import { RouterModule } from "@angular/router";
import { GraphQLService } from "./services/grapql.service";

@Component({
    selector: "app-root",
    standalone: true,
    imports: [RouterModule, HttpClientModule], 
    template: `          
            <router-outlet></router-outlet>       
    `,
    providers: [GraphQLService]
})
export class AppComponent { 
    name = "AppComponent";
}