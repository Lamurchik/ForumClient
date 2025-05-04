import { provideRouter, Routes } from "@angular/router";
import { ApplicationConfig, Component } from "@angular/core";


import { HomeComponent } from "./Commponent/pages/home/home.component";
import { NotFoundComponent } from "./Commponent/pages/not-found/not-found.component";
import { LayoutComponent } from "./Commponent/Layout/layout.component";
import {LoginComponent} from "./Commponent/pages/login/login.component"
import {EditorComponent} from "./Commponent/Editor/editor.component"
import {RegisterComponent} from "./Commponent/pages/register/register.component"
import {PostComponent} from  "./Commponent/pages/post/post.component"
import {PostWorkComponent} from "./Commponent/pages/post-work/post-work"
import {ProfileComponent} from './Commponent/pages/profile/profile.component'

const routes: Routes = [
    {
        path: "", component: LayoutComponent, children: [
            { path: "", component: HomeComponent },
            {path: "editor", component : EditorComponent},
            {path: "post-work" , component :PostWorkComponent},
            {path: "post/:id", component : PostComponent},
            {path: "profile", component: ProfileComponent}
        ]
    },
    {path: "login" , component : LoginComponent}, 
    {path: "register", component : RegisterComponent},

    { path: "**", component: NotFoundComponent }
];

export const appConfig: ApplicationConfig = {
    providers: [provideRouter(routes)]
};