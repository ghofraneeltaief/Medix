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

import listimg from "views/listes.js";
import Profile from "views/Profile.js";

const dashboardRoutes = [
 
  {
    path: "/listimg",
    name: "image médicale",
    icon: "nc-icon nc-tv-2",
    component: listimg,
    layout: "/dashboard",
  },
  {
    path: "/Profil",
    name: "Mon Profil",
    icon: "nc-icon nc-circle-09",
    component: Profile,
    layout: "/dashboard",
  },
];

export default dashboardRoutes;
