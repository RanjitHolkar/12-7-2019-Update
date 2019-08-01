import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes, ParamMap } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppComponent } from './app.component';
import * as $ from "jquery";
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { AuthenticationService } from './_services/authentication.service';
import { UserService } from './_services/user.service';
import { AuthGuard } from './_guards/auth.guard';
import { TokenInterceptor } from './_helpers/token.interceptor';
import { JwtInterceptor } from './_helpers/jwt.interceptor';
import { DataTableModule} from "angular-6-datatable";
import { NgxPaginationModule} from 'ngx-pagination';
import { RoleGuardService as RoleGuard } from './_guards/RoleGuardService';
import { ContactusComponent } from './contactus/contactus.component';
import { AboutusComponent } from './aboutus/aboutus.component';
import { FaqComponent } from './faq/faq.component';
import { PrivacyPolicyComponent } from './privacy-policy/privacy-policy.component';
import { SignUpLandloardComponent } from './sign-up-landloard/sign-up-landloard.component';
import { SignUpTenantComponent } from './sign-up-tenant/sign-up-tenant.component';
import { DashboardComponent } from './landloardDash/dashboard/dashboard.component';
import { AddTenantComponent } from './landloardDash/add-tenant/add-tenant.component';
import { AddLandloradStaffComponent } from './landloardDash/add-landlorad-staff/add-landlorad-staff.component';
import { TenatDashComponent } from './tenantDash/tenat-dash/tenat-dash.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { NavComponent } from './nav/nav.component';
import { TenantSidebarComponent } from './tenantDash/tenant-sidebar/tenant-sidebar.component';
import { LandSidebarComponent } from './landloardDash/land-sidebar/land-sidebar.component';
import { AdminSidebarComponent } from './adminDash/admin-sidebar/admin-sidebar.component';
import { AdminDashComponent } from './adminDash/admin-dash/admin-dash.component';
import { AdminNavComponent } from './adminDash/admin-nav/admin-nav.component';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { AccountRecoveryComponent } from './account-recovery/account-recovery.component';
import { AddPropertiesComponent } from './landloardDash/add-properties/add-properties.component';
import { SuppliersComponent } from './landloardDash/suppliers/suppliers.component';
import { FinancialReportComponent } from './landloardDash/financial-report/financial-report.component';
import { LeasesReportComponent } from './landloardDash/leases-report/leases-report.component';
import { TenantTimelineComponent } from './tenantDash/tenant-timeline/tenant-timeline.component';
import { TenantPaymentComponent } from './tenantDash/tenant-payment/tenant-payment.component';
import { TenantPayrentComponent } from './tenantDash/tenant-payrent/tenant-payrent.component';
import { TenantHistoryComponent } from './tenantDash/tenant-history/tenant-history.component';
import { TenantFilesComponent } from './tenantDash/tenant-files/tenant-files.component';
import { TenantServiesReqComponent} from './tenantDash/tenant-servies-req/tenant-servies-req.component'; 
import { TenantContactLanlordComponent} from './tenantDash/tenant-contact-lanlord/tenant-contact-lanlord.component';
import { TenantProfileComponent} from './tenantDash/tenant-profile/tenant-profile.component';
import { TenantNotificationComponent} from './tenantDash/tenant-notification/tenant-notification.component';
import { TenantSecurityComponent} from './tenantDash/tenant-security/tenant-security.component';
import { TenantNavComponent } from './tenantDash/tenant-nav/tenant-nav.component';
import { LandNavComponent } from './landloardDash/land-nav/land-nav.component';
import { LeaseComponent } from './landloardDash/lease/lease.component';
import { DocumentsComponent } from './landloardDash/documents/documents.component';
import { ApplicationsComponent } from './landloardDash/applications/applications.component';
import { AllTransactionsComponent } from './landloardDash/all-transactions/all-transactions.component';
import { RecurringTransactionComponent} from './landloardDash/recurring-transaction/recurring-transaction.component';
import { MyProfileComponent } from './landloardDash/my-profile/my-profile.component';
import { PaymentOptionComponent } from './landloardDash/payment-option/payment-option.component';
import { NotificationComponent } from './landloardDash/notification/notification.component';
import { AddUsersComponent } from './landloardDash/add-users/add-users.component';
import { SecurityComponent } from './landloardDash/security/security.component';
import { BillingComponent } from './landloardDash/billing/billing.component';
import { MassagesComponent } from './landloardDash/massages/massages.component';
import { RequestLandloardDashComponent} from'./landloardDash/request-landloard-dash/request-landloard-dash.component';
import { CreateUsersComponent} from './adminDash/create-users/create-users.component';
import { NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { AdminProfileComponent } from './adminDash/admin-profile/admin-profile.component';
import { ImageCropperModule } from 'ngx-image-cropper';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ng6-toastr-notifications';
import { ViewUnitComponent } from './landloardDash/view-unit/view-unit.component';
import { SearchTenantComponent } from './tenantDash/search-tenant/search-tenant.component';
import * as jspdf from 'jspdf';  
import html2canvas from 'html2canvas'; 
import { AutocompleteLibModule} from 'angular-ng-autocomplete';
import { NgxGalleryModule } from 'ngx-gallery';
import { SocialLoginModule,AuthServiceConfig,GoogleLoginProvider} from "angular-6-social-login";
import { TransactionComponent } from './tenantDash/my-house/transaction/transaction.component';
import { LeaseDetailsComponent } from './tenantDash/my-house/lease-details/lease-details.component';
import { FilesComponent } from './tenantDash/my-house/files/files.component';
import { HistoryComponent } from './tenantDash/my-house/history/history.component';
import { ServiceRequestComponent } from './tenantDash/my-house/service-request/service-request.component';
import { ContactLandlordComponent } from './tenantDash/my-house/contact-landlord/contact-landlord.component';
import { MyHouseNavComponent } from './tenantDash/my-house/my-house-nav/my-house-nav.component';
import { NoticeComponent } from './landloardDash/notice/notice.component';
import { TenantNoticeComponent } from './tenantDash/my-house/tenant-notice/tenant-notice.component';
import { ChatComponent } from './landloardDash/chat/chat.component';
import { SafePipe } from './safe.pipe';
import { TenantChatComponent } from './tenantDash/tenant-chat/tenant-chat.component';
import { NotificationLandloardComponent } from './landloardDash/notification-landloard/notification-landloard.component';
import { AdminMpesaComponent } from './adminDash/admin-mpesa/admin-mpesa.component';

const appRoutes: Routes = [
  { path: '', redirectTo: 'login', pathMatch:'full'},
  { path: 'login', component: LoginComponent},
  { path: 'home', component: HomeComponent , canActivate: [AuthGuard]},
  { path: 'signup-landloard',component:SignUpLandloardComponent},
  { path: 'signup-tenant',component:SignUpTenantComponent},
  { path: 'forgot-password', component:ForgotPasswordComponent},
  { path: 'accountRecovery/:id',component:AccountRecoveryComponent},

//---------------Tenant-------------------------------

   { path:'tenant-dash',component:TenatDashComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },
   { path:'tenant-search',component:SearchTenantComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },
   { path:'tenant-timeline',component:TenantTimelineComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },
   { path:'tenant-payment',component:TenantPaymentComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } }, 
   { path:'tenant-pay-rent',component:TenantPayrentComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } }, 
   { path:'tenant-request',component:ServiceRequestComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } }, 
   { path:'tenant-history',component:HistoryComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } }, 
   { path:'tenant-landlord-contact',component:TenantContactLanlordComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } }, 
   { path:'tenant-lease',component:LeaseDetailsComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },   
   { path:'tenant-files',component:FilesComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },   
   
   { path:'tenant-contact',component:ContactLandlordComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },   
   { path:'my-house',component:TransactionComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },   
   { path:'tenant-profile',component:TenantProfileComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },
   { path:'tenant-notification',component:TenantNotificationComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },
   { path:'tenant-security',component:TenantSecurityComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },
   { path:'tenant-notice',component:TenantNoticeComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },
   { path:'tenant-chat',component:TenantChatComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'tenant'  } },
   
//----------------landlord-----------------------------
  { path: 'landlord-dash',component:DashboardComponent, canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  } },
  { path: 'tenants-list',  component: AddTenantComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'add-properties',  component: AddPropertiesComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'suppliers',  component: SuppliersComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },  
  { path: 'leases-report',  component: LeasesReportComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'financial-report',  component: FinancialReportComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'lease-list',  component: LeaseComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'application',  component: ApplicationsComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'all-transactions',  component: AllTransactionsComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'all-transactions/:property_id',  component: AllTransactionsComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'recurring-transactions',  component: RecurringTransactionComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'my-profile',  component: MyProfileComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'payment-option',  component: PaymentOptionComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'add-users',  component: AddUsersComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'add-staff',component:AddLandloradStaffComponent,canActivate:[RoleGuard],data:{ expectedRole:'landlord'}},
  { path: 'land-security',  component: SecurityComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'land-billing',  component: BillingComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'land-massages',  component: MassagesComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'notification',  component: NotificationComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'unit-details/:id/:unitId',  component: ViewUnitComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'unit-details/:id',  component: ViewUnitComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'tenants-list/:id',  component: AddTenantComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'document-details',  component: DocumentsComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'request-details',  component: RequestLandloardDashComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'messages/:tenant_id',  component: MassagesComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },  
  { path: 'messages',  component: MassagesComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'notice',  component: NoticeComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  { path: 'landlord-chat',  component: ChatComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },  
  { path: 'landlord-notification',  component: NotificationLandloardComponent,  canActivate: [RoleGuard],  data: {    expectedRole: 'landlord'  }  },
  

//----------------supper Admin -------------------------

  {path:'admin-dash',component:AdminDashComponent,canActivate: [RoleGuard],  data: {    expectedRole: 'admin'  } },
  {path:'create-users',component:CreateUsersComponent,canActivate: [RoleGuard],  data: {    expectedRole: 'admin'  } },
  {path :'admin-profile', component:AdminProfileComponent,canActivate:[RoleGuard],data:{ expectedRole:'admin'}} , 
  {path :'admin-mpesa', component:AdminMpesaComponent,canActivate:[RoleGuard],data:{ expectedRole:'admin'}} , 
  
  
  { path: '**', component:LoginComponent }
];
export function getAuthServiceConfigs() {
  let config = new AuthServiceConfig(
      [
        {
          id: GoogleLoginProvider.PROVIDER_ID,
          provider: new GoogleLoginProvider("837408630116-8fdsrsn0idg8n5gcv2k1goakvfr8ked0.apps.googleusercontent.com")
        },
          
      
      ])
  return config;
}
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    ContactusComponent,
    AboutusComponent,
    FaqComponent,
    PrivacyPolicyComponent,
    SignUpLandloardComponent,
    SignUpTenantComponent,
    DashboardComponent,
    AddTenantComponent,
    AddLandloradStaffComponent,
    TenatDashComponent,
    SidebarComponent,
    NavComponent,
    TenantSidebarComponent,
    LandSidebarComponent,
    AdminSidebarComponent,
    AdminDashComponent,
    AdminNavComponent,
    ForgotPasswordComponent,
    AccountRecoveryComponent,
    AddPropertiesComponent,
    SuppliersComponent,
    FinancialReportComponent,
    LeasesReportComponent,
    TenantTimelineComponent,
    TenantPaymentComponent,
    TenantPayrentComponent,
    TenantHistoryComponent,
    TenantFilesComponent,
    TenantServiesReqComponent,
    TenantContactLanlordComponent,
    TenantProfileComponent,TenantNotificationComponent,TenantSecurityComponent, 
    TenantNavComponent,
    LandNavComponent,
    LeaseComponent, DocumentsComponent, ApplicationsComponent, AllTransactionsComponent,
    RecurringTransactionComponent,
    MyProfileComponent,
    PaymentOptionComponent,
    NotificationComponent,
    AddUsersComponent,
    SecurityComponent,
    BillingComponent,
    MassagesComponent,
    CreateUsersComponent,
    AdminProfileComponent,
    ViewUnitComponent,
    SearchTenantComponent,
    RequestLandloardDashComponent,
    TransactionComponent,
    LeaseDetailsComponent,
    FilesComponent,
    HistoryComponent,
    ServiceRequestComponent,
    ContactLandlordComponent,
    MyHouseNavComponent,
    NoticeComponent,
    TenantNoticeComponent,
    ChatComponent,
    SafePipe,
    TenantChatComponent,
    NotificationLandloardComponent,
    AdminMpesaComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxGalleryModule,
    RouterModule.forRoot(appRoutes),
    NgbModule,
    ImageCropperModule,
    BrowserAnimationsModule,
    SocialLoginModule,
    DataTableModule,
    AutocompleteLibModule,
    NgxPaginationModule,
    ToastrModule.forRoot()
  ],
  providers: [
        AuthGuard,RoleGuard,
        AuthenticationService,
        {
          provide: AuthServiceConfig,
        useFactory: getAuthServiceConfigs
        },
        UserService,
        {
            provide: HTTP_INTERCEPTORS,
            useClass: TokenInterceptor,
            multi: true
        },
        {
            provide: HTTP_INTERCEPTORS,
            useClass: JwtInterceptor,
            multi: true
        }

		],
  bootstrap: [AppComponent]
})
export class AppModule { }
