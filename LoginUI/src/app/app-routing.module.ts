import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddAppComponent } from './add-app/add-app.component';
import { AdminComponent } from './admin/admin.component';
import { AlluserdetailsComponent } from './alluserdetails/alluserdetails.component';
import { AppServerdataComponent } from './app-serverdata/app-serverdata.component';
import { AuthGuardService } from './auth.guard';
import { ApplicatComponent } from './client/applicat/applicat.component';


import { ClientComponent } from './client/client.component';
import { ServerlistComponent } from './client/serverlist/serverlist.component';
import { D3AppComponent } from './d3app/d3app.component';
import { DeleteappComponent } from './deleteapp/deleteapp.component';
import { EditappComponent } from './editapp/editapp.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { PermissionGuard } from './permission.guard';
import { ProjectteamComponent } from './projectteam/projectteam.component';
import { SignupComponent } from './signup/signup.component';
import { UploadFileComponent } from './upload-file/upload-file.component';
import { UserComponent } from './user/user.component';


const routes: Routes = [
  {path:'signup',component:SignupComponent},
  {path:'addapp',component:AddAppComponent},
  {path:'',component:LoginComponent},
  {path:'home',component:HomeComponent
     },

  {path:'homeAdmin',component:HomeComponent},


  // {
  //   path: 'forgotpassword',component:ForgotpasswordComponent

  // },
  {
    path: 'admin',
    component:AdminComponent
  },
  {
    path: 'AllUser',
    component:AlluserdetailsComponent
  },
{
  path: 'user',
  component:UserComponent
},
  {
    path: 'client',
    component:ClientComponent
  },

  {
    path:'d3app',
    component:D3AppComponent
  },
  {
    path:'appEdit/:id',
    component:EditappComponent
  },
  {
    path:'projectTeam',
    component:ProjectteamComponent
  },
  {
    path:'delete',
    component:DeleteappComponent
  },
  {
    path:'UploadFile',
    component:UploadFileComponent
   
},
{
  path:'applications/:id',
  component:ApplicatComponent
},
{
  path:'serverList',
  component:ServerlistComponent
},
{
  path:'serverappdata',
  component:AppServerdataComponent,
}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
