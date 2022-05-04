import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";
import { PreloadAllModules } from "@angular/router";

const routes: Routes = [
  { path: "", redirectTo: "auth", pathMatch: "full" },
  {
    path: "auth",
    loadChildren: () =>
      import("./modules/auth/auth.module").then((m) => m.AuthModule),
    // canActivateChild: [AuthenticationGuard],
    data: {
      moduleName: "Auth",
    },
  },
  {
    path: "restaurant",
    loadChildren: () =>
      import("./modules/restaurant/restaurant.module").then(
        (m) => m.RestaurantModule
      ),
    // canActivateChild: [AuthenticationGuard],
    data: {
      moduleName: "Restaurant",
    },
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
