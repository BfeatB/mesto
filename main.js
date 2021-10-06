(()=>{"use strict";const t={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_type_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error-message_type_active"},e=document.querySelector(".profile__edit-button"),s=document.querySelector("form[name = 'profile']"),i=s.querySelector("input[name='name']"),r=s.querySelector("input[name='about']"),n=document.querySelector(".profile__add-button"),o=document.querySelector(".profile__img-wrapper");class a{constructor(t,e,s,{handleCardClick:i,handleCardDelete:r,handleCardLike:n}){this._card=t,this._templateSelector=e,this._userId=s,this._handleCardClick=i,this._handleCardDelete=r,this._handleCardLike=n}_setEventListeners(){this.element.querySelector(".card__img").addEventListener("click",this._handleCardClick),this.element.querySelector(".card__like-button").addEventListener("click",this._onLikeButtonClick.bind(this)),this.element.querySelector(".card__delete-button").addEventListener("click",this._onDeleteButtonClick.bind(this))}_onLikeButtonClick(){this._handleCardLike(this._card._id,(t=>{this._updateLikes(t.likes)}),this._isLiked)}_onDeleteButtonClick(t){this._handleCardDelete(this._card._id,(()=>{t.target.closest(".card").remove()}))}_updateLikes(t){this.element.querySelector(".card__like-counter").textContent=t.length;const e=t.find((t=>t._id===this._userId)),s=this.element.querySelector(".card__like-button");e?s.classList.add("card__like-button_active"):s.classList.remove("card__like-button_active"),this._isLiked=e}_getTemplate(){return document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(!0)}generateCard(){this.element=this._getTemplate();const t=this.element.querySelector(".card__img");return t.setAttribute("src",this._card.link),t.setAttribute("alt",this._card.name),this.element.querySelector(".card__capture").textContent=this._card.name,this._updateLikes(this._card.likes),this._card.owner._id===this._userId&&this.element.querySelector(".card__delete-button").classList.add("card__delete-button_visible"),this._setEventListeners(),this.element}}class l{constructor(t,e){this._form=document.querySelector(e),this._selectors=t,this._inputList=Array.from(this._form.querySelectorAll(this._selectors.inputSelector)),this._submitButton=this._form.querySelector(this._selectors.submitButtonSelector)}_showInputError(t,e){const s=this._form.querySelector(`.${t.id}-error`);t.classList.add(this._selectors.inputErrorClass),s.textContent=e,s.classList.add(this._selectors.errorClass)}_hideInputError(t){const e=this._form.querySelector(`.${t.id}-error`);t.classList.remove(this._selectors.inputErrorClass),e.classList.remove(this._selectors.errorClass),e.textContent=""}_checkInputValidity(t){t.validity.valid?this._hideInputError(t):this._showInputError(t,t.validationMessage)}_setEventListeners(){this._toggleButtonState(),this._inputList.forEach((t=>{t.addEventListener("input",(()=>{this._checkInputValidity(t),this._toggleButtonState()}))})),this._form.addEventListener("reset",(()=>{this._disableButton()}))}_hasInvalidInput(){return this._inputList.some((t=>!t.validity.valid))}_toggleButtonState(){this._hasInvalidInput()?this._disableButton():this._enableButton()}_disableButton(){this._submitButton.classList.add(this._selectors.inactiveButtonClass),this._submitButton.setAttribute("disabled","disabled")}_enableButton(){this._submitButton.classList.remove(this._selectors.inactiveButtonClass),this._submitButton.removeAttribute("disabled")}setInitialFormState(){this._inputList.forEach((t=>{this._hideInputError(t)})),this._toggleButtonState()}enableValidation(){this._form.addEventListener("submit",(t=>{t.preventDefault()})),this._setEventListeners()}}class c{constructor(t){this._selector=t,this._popupEl=document.querySelector(t),this._handleEscClose=this._handleEscClose.bind(this),this._onOverlayClick=this._onOverlayClick.bind(this)}open(){this._popupEl.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose),document.addEventListener("mousedown",this._onOverlayClick)}close(){this._popupEl.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose),document.removeEventListener("mousedown",this._onOverlayClick)}_onOverlayClick(t){t.target.classList.contains("popup_opened")&&this.close()}_handleEscClose(t){"Escape"===t.key&&this.close()}setEventListeners(){this._popupEl.querySelector(".popup__close").addEventListener("click",(()=>this.close()))}}class u extends c{constructor(t,e){super(t),this._onFormSubmit=e,this._inputs=this._popupEl.querySelectorAll(".popup__input"),this._form=this._popupEl.querySelector(".popup__form"),this._submit=this._form.querySelector(".popup__button"),this._submitText=this._submit.textContent}_getInputValues(){const t={};return this._inputs.forEach((e=>{t[e.name]=e.value})),t}enableSubmit(){this._submit.removeAttribute("disabled"),this._submit.textContent=this._submitText}disableSubmit(){this._submit.setAttribute("disabled","disabled"),this._submit.textContent="Сохранение..."}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(t=>{this._onFormSubmit(this._getInputValues()),t.preventDefault()}))}close(){super.close(),this._form.reset()}}const d=new class{constructor(t){this._options=t}_fetch(t,e){return fetch(this._options.baseUrl+t,{headers:this._options.headers,...e}).then((t=>t.ok?t.json():Promise.reject(`Ошибка: ${t.status}`)))}getUserInfo(){return this._fetch("/users/me")}getInitialCards(){return this._fetch("/cards")}updateUserInfo(t){return this._fetch("/users/me",{method:"PATCH",body:JSON.stringify(t)})}addNewCard(t){return this._fetch("/cards",{method:"POST",body:JSON.stringify(t)})}deleteCard(t){return this._fetch(`/cards/${t}`,{method:"DELETE"})}setLike(t){return this._fetch(`/cards/likes/${t}`,{method:"PUT"})}deleteLike(t){return this._fetch(`/cards/likes/${t}`,{method:"DELETE"})}changeAvatar(t){return this._fetch("/users/me/avatar",{method:"PATCH",body:JSON.stringify(t)})}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-28",headers:{authorization:"b1cd0dc5-2b23-4623-93d8-d89ffc3baa40","Content-Type":"application/json"}});function h(t){const e=S.getUserInfo()._id;return new a(t,"#cardTemplate",e,{handleCardClick:t=>{const e=t.target.getAttribute("src"),s=t.target.getAttribute("alt");f.open({src:e,alt:s})},handleCardDelete:(t,e)=>{E.open(t,e)},handleCardLike:(t,e,s)=>{s?d.deleteLike(t).then((t=>{e(t)})).catch(y):d.setLike(t).then((t=>{e(t)})).catch(y)}}).generateCard()}const _=new class{constructor({items:t,renderer:e},s){this.items=t,this.renderer=e,this.containerEl=document.querySelector(s)}renderAll(t){this.items.concat(t).forEach((t=>{this.containerEl.append(this.renderer(t))}))}addItem(t){this.containerEl.prepend(t)}}({items:[],renderer:h},".cards");Promise.all([d.getInitialCards(),d.getUserInfo()]).then((([t,e])=>{S.setUserInfo(e),S.render(),_.renderAll(t)}));const p=new l(t,"form[name = 'profile']");p.enableValidation();const m=new l(t,"form[name = 'addCard']");m.enableValidation();const b=new l(t,"form[name = 'changeAvatar']");b.enableValidation();const f=new class extends c{constructor(t){super(t),this._popupImg=this._popupEl.querySelector(".popup__img-gallery"),this._popupCaption=this._popupEl.querySelector(".popup__figcaption")}open({src:t,alt:e}){super.open(),this._popupImg.setAttribute("src",t),this._popupImg.setAttribute("alt",e),this._popupCaption.textContent=e}}("#popup-gallery");f.setEventListeners();const v=new u("#popup-profile",(function(t){v.disableSubmit(),d.updateUserInfo(t).then((t=>{S.setUserInfo(t),S.render(),v.close()})).catch(y).finally((()=>{v.enableSubmit()}))})),S=new class{constructor({nameSelector:t,aboutSelector:e,avatarSelector:s}){this.name=document.querySelector(t),this.about=document.querySelector(e),this.avatar=document.querySelector(s)}render(){this.name.textContent=this._userInfo.name,this.about.textContent=this._userInfo.about,this.avatar.setAttribute("src",this._userInfo.avatar)}setUserAvatar(t){this._userInfo.avatar=t}getUserInfo(){return this._userInfo}setUserInfo(t){this._userInfo=t}}({nameSelector:".profile__name",aboutSelector:".profile__description",avatarSelector:".profile__avatar"});v.setEventListeners();const C=new u("#popup-place",(function({place:t,url:e}){const s={name:t,link:e};C.disableSubmit(),d.addNewCard(s).then((t=>{_.addItem(h(t)),C.close()})).catch(y).finally((()=>{C.enableSubmit()}))})),E=new class extends u{constructor(t,e){super(t,(()=>{})),this._onConfirmationFormSubmit=e}open(t,e){this._cardId=t,this._afterFormSubmit=e,super.open()}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(t=>{t.preventDefault(),this._onConfirmationFormSubmit(this._cardId,this._afterFormSubmit)}))}}("#popup-confirmation",(function(t,e){E.disableSubmit(),d.deleteCard(t).then((()=>{e(),E.close()})).catch(y).finally((()=>{E.enableSubmit()}))}));E.setEventListeners();const L=new u("#popup-change-avatar",(function(t){L.disableSubmit(),d.changeAvatar(t).then((()=>{S.setUserAvatar(t.avatar),S.render(),L.close()})).catch(y).finally((()=>{L.enableSubmit()}))}));function y(t){console.error(t)}L.setEventListeners(),C.setEventListeners(),o.addEventListener("click",(function(){L.open(),b.setInitialFormState()})),e.addEventListener("click",(function(){v.open(),function(){const t=S.getUserInfo();i.value=t.name,r.value=t.about,p.setInitialFormState()}()})),n.addEventListener("click",(function(){C.open(),m.setInitialFormState()}))})();