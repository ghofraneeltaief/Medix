/*!

=========================================================
* Light Bootstrap Dashboard React - v2.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/light-bootstrap-dashboard-react
* Copyright 2020 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/light-bootstrap-dashboard-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import UserProfile from "views/UserProfile.js";
import Liste from "views/ListesPatient.js";


const dashboardRoutes = [
  {
    path: "/Patients",
    name: "Liste Images",
    icon: "nc-icon nc-notes",
    component: Liste,
    layout: "/medecin",
  },
  {
    path: "/Profil",
    name: "Mon Profil",
    icon: "nc-icon nc-circle-09",
    component: UserProfile,
    layout: "/medecin",
  },

];

export default dashboardRoutes;
