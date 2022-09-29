"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([["src_app_pages_settings_settings_module_ts"],{7485:(G,p,i)=>{i.r(p),i.d(p,{SettingsPageModule:()=>v});var u=i(6362),l=i(587),o=i(3444),c=i(5513),h=i(4929),t=i(6723),g=i(5211),d=i(190),f=i(1903);function m(e,a){if(1&e){const n=t.EpF();t.ynx(0),t.TgZ(1,"ion-button",11),t.NdJ("click",function(){return t.CHM(n),t.oxw().buyFullVersion()}),t._UZ(2,"ion-icon",12),t._uU(3),t.ALo(4,"translate"),t.qZA(),t.TgZ(5,"ion-button",13),t.NdJ("click",function(){return t.CHM(n),t.oxw().refreshStore()}),t._UZ(6,"ion-icon",14),t._uU(7),t.ALo(8,"translate"),t.qZA(),t.BQk()}2&e&&(t.xp6(3),t.hij("\xa0 ",t.lcZ(4,2,"SETTINGS_PAGE.buyFullVersion")," "),t.xp6(4),t.hij("\xa0 ",t.lcZ(8,4,"SETTINGS_PAGE.restorePurchases")," "))}function S(e,a){1&e&&(t.TgZ(0,"ion-button",15),t._UZ(1,"ion-icon",16),t._uU(2),t.ALo(3,"translate"),t.qZA()),2&e&&(t.xp6(2),t.hij("\xa0 ",t.lcZ(3,1,"SETTINGS_PAGE.owningFullVersion")," "))}function P(e,a){if(1&e&&(t.TgZ(0,"ion-select-option",17),t._uU(1),t.qZA()),2&e){const n=a.$implicit;t.Q6J("value",n),t.xp6(1),t.Oqu(n.name)}}const T=[{path:"",component:(()=>{class e{constructor(n,s,r,_,Z,x){this.translate=n,this.formBuilder=s,this.storage=r,this.purchaseService=_,this.ref=Z,this.loadingCtrl=x,this.languages=[{name:"English",langCode:"en"},{name:"Deutsch",langCode:"de"}]}ngOnInit(){let n;for(let s of this.languages)s.langCode===this.translate.currentLang&&(n=s);n||(n=this.languages[0]),this.settingsForm=this.formBuilder.group({language:[n]}),this.setPurchaseProps()}setPurchaseProps(){this.purchasesAvailable=this.purchaseService.purchasesAvailable,this.hasFullVersion=this.purchaseService.hasFullVersion}saveLanguage(){const n=this.settingsForm.controls.language.value.langCode;this.translate.use(n),this.storage.set("language",n)}buyFullVersion(){return(0,h.mG)(this,void 0,void 0,function*(){yield this.purchaseService.purchaseFullVersion(),this.refreshStore()})}refreshStore(){return(0,h.mG)(this,void 0,void 0,function*(){const n=yield this.loadingCtrl.create({message:this.translate.instant("SETTINGS_PAGE.updating"),showBackdrop:!0});yield n.present(),this.purchaseService.refresh(),setTimeout(()=>{n.dismiss(),this.setPurchaseProps(),this.ref.detectChanges()},3e3)})}}return e.\u0275fac=function(n){return new(n||e)(t.Y36(g.sK),t.Y36(l.qu),t.Y36(d.K),t.Y36(f.B3),t.Y36(t.sBO),t.Y36(o.HT))},e.\u0275cmp=t.Xpm({type:e,selectors:[["app-settings"]],decls:21,vars:15,consts:[[3,"translucent"],["color","primary"],["slot","end"],["menu","first"],[4,"ngIf"],["class","ion-padding-horizontal offset-top","color","success","size","default","expand","block",4,"ngIf"],[3,"formGroup"],["mode","ios",3,"inset"],["interface","action-sheet","okText","Okay","cancelText","Cancel","formControlName","language",3,"ionChange"],[3,"value",4,"ngFor","ngForOf"],["color","danger","size","default","expand","block","routerLink","/accountdeletion",1,"ion-padding-horizontal","deleteAccountButton"],["color","success","size","default","expand","block",1,"ion-padding-horizontal","offset-top",3,"click"],["name","diamond-outline"],["color","primary","size","default","expand","block",1,"ion-padding-horizontal","offset-top-small",3,"click"],["name","refresh-outline"],["color","success","size","default","expand","block",1,"ion-padding-horizontal","offset-top"],["name","bag-check-outline"],[3,"value"]],template:function(n,s){1&n&&(t.TgZ(0,"ion-header",0)(1,"ion-toolbar",1)(2,"ion-buttons",2),t._UZ(3,"ion-menu-button",3),t.qZA(),t.TgZ(4,"ion-title"),t._uU(5),t.ALo(6,"translate"),t.qZA()()(),t.TgZ(7,"ion-content"),t.YNc(8,m,9,6,"ng-container",4),t.YNc(9,S,4,3,"ion-button",5),t.TgZ(10,"form",6)(11,"ion-list",7)(12,"ion-item")(13,"ion-label"),t._uU(14),t.ALo(15,"translate"),t.qZA(),t.TgZ(16,"ion-select",8),t.NdJ("ionChange",function(){return s.saveLanguage()}),t.YNc(17,P,2,2,"ion-select-option",9),t.qZA()()()(),t.TgZ(18,"ion-button",10),t._uU(19),t.ALo(20,"translate"),t.qZA()()),2&n&&(t.Q6J("translucent",!0),t.xp6(5),t.hij("",t.lcZ(6,9,"SETTINGS_PAGE.pageTitle")," "),t.xp6(3),t.Q6J("ngIf",s.purchasesAvailable&&!s.hasFullVersion),t.xp6(1),t.Q6J("ngIf",s.purchasesAvailable&&s.hasFullVersion),t.xp6(1),t.Q6J("formGroup",s.settingsForm),t.xp6(1),t.Q6J("inset",!0),t.xp6(3),t.hij(" ",t.lcZ(15,11,"SETTINGS_PAGE.language")," "),t.xp6(3),t.Q6J("ngForOf",s.languages),t.xp6(2),t.hij(" ",t.lcZ(20,13,"SETTINGS_PAGE.deleteAccount")," "))},directives:[o.Gu,o.sr,o.Sm,o.fG,o.wd,o.W2,u.O5,o.YG,o.gu,l._Y,l.JL,l.sg,o.q_,o.Ie,o.Q$,o.t9,o.QI,l.JJ,l.u,u.sg,o.n0,o.YI,c.rH],pipes:[g.X$],styles:[".deleteAccountButton[_ngcontent-%COMP%]{position:absolute;bottom:20px;right:0;width:200px;height:50px}.offset-top[_ngcontent-%COMP%]{margin-top:20px}.offset-top-small[_ngcontent-%COMP%]{margin-top:10px}"]}),e})()}];let A=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[c.Bz.forChild(T)],c.Bz]}),e})(),v=(()=>{class e{}return e.\u0275fac=function(n){return new(n||e)},e.\u0275mod=t.oAB({type:e}),e.\u0275inj=t.cJS({imports:[[u.ez,l.u5,l.UX,o.Pc,A,g.aw]]}),e})()}}]);
//# sourceMappingURL=src_app_pages_settings_settings_module_ts.1d55845a7fd23577.js.map