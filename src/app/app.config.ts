import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig, Component } from "@angular/core";


import { HomeComponent } from "./Commponent/pages/home/home.component";
import { NotFoundComponent } from "./Commponent/pages/not-found/not-found.component";
import { LayoutComponent } from "./Commponent/Layout/layout.component";
import {LoginComponent} from "./Commponent/pages/login/login.component"
import {EditorComponent} from "./Commponent/Editor/editor.component"
import {RegisterComponent} from "./Commponent/pages/register/register.component"

 

const routes: Routes = [
    {
        path: "", component: LayoutComponent, children: [
            { path: "", component: HomeComponent },
            {path: "editor", component : EditorComponent}
        ]
    },
    {path: "login" , component : LoginComponent}, 
    {path: "register", component : RegisterComponent},

    { path: "**", component: NotFoundComponent }
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
};