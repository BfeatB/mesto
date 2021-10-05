(()=>{"use strict";const e={formSelector:".popup__form",inputSelector:".popup__input",submitButtonSelector:".popup__button",inactiveButtonClass:"popup__button_type_disabled",inputErrorClass:"popup__input_type_error",errorClass:"popup__error-message_type_active"},t=document.querySelector(".profile__edit-button"),s=document.querySelector("form[name = 'profile']"),r=s.querySelector("input[name='name']"),i=s.querySelector("input[name='about']"),n=document.querySelector(".profile__add-button"),o=document.querySelector(".profile__img-wrapper");class a{constructor(e,t,s,{handleCardClick:r,handleCardDelete:i,handleCardLike:n}){this._card=e,this._templateSelector=t,this._userId=s,this._handleCardClick=r,this._handleCardDelete=i,this._handleCardLike=n}_setEventListeners(){this.element.querySelector(".card__img").addEventListener("click",this._handleCardClick),this.element.querySelector(".card__like-button").addEventListener("click",this._onLikeButtonClick.bind(this)),this.element.querySelector(".card__delete-button").addEventListener("click",this._onDeleteButtonClick.bind(this))}_onLikeButtonClick(){this._handleCardLike(this._card._id,(e=>{this._updateLikes(e.likes)}),this._isLiked)}_onDeleteButtonClick(e){this._handleCardDelete(this._card._id,(()=>{e.target.closest(".card").remove()}))}_updateLikes(e){this.element.querySelector(".card__like-counter").textContent=e.length;const t=e.find((e=>e._id===this._userId)),s=this.element.querySelector(".card__like-button");t?s.classList.add("card__like-button_active"):s.classList.remove("card__like-button_active"),this._isLiked=t}_getTemplate(){return document.querySelector(this._templateSelector).content.firstElementChild.cloneNode(!0)}generateCard(){this.element=this._getTemplate();const e=this.element.querySelector(".card__img");return e.setAttribute("src",this._card.link),e.setAttribute("alt",this._card.name),this.element.querySelector(".card__capture").textContent=this._card.name,this._updateLikes(this._card.likes),this._card.owner._id===this._userId&&this.element.querySelector(".card__delete-button").classList.add("card__delete-button_visible"),this._setEventListeners(),this.element}}class l{constructor(e,t){this._form=document.querySelector(t),this._selectors=e,this._inputList=Array.from(this._form.querySelectorAll(this._selectors.inputSelector)),this._submitButton=this._form.querySelector(this._selectors.submitButtonSelector)}_showInputError(e,t){const s=this._form.querySelector(`.${e.id}-error`);e.classList.add(this._selectors.inputErrorClass),s.textContent=t,s.classList.add(this._selectors.errorClass)}_hideInputError(e){const t=this._form.querySelector(`.${e.id}-error`);e.classList.remove(this._selectors.inputErrorClass),t.classList.remove(this._selectors.errorClass),t.textContent=""}_checkInputValidity(e){e.validity.valid?this._hideInputError(e):this._showInputError(e,e.validationMessage)}_setEventListeners(){this._toggleButtonState(),this._inputList.forEach((e=>{e.addEventListener("input",(()=>{this._checkInputValidity(e),this._toggleButtonState()}))})),this._form.addEventListener("reset",(()=>{this._toggleButtonState()}))}_hasInvalidInput(){return this._inputList.some((e=>!e.validity.valid))}_toggleButtonState(){this._hasInvalidInput()?this._disableButton():this._enableButton()}_disableButton(){this._submitButton.classList.add(this._selectors.inactiveButtonClass),this._submitButton.setAttribute("disabled","disabled")}_enableButton(){this._submitButton.classList.remove(this._selectors.inactiveButtonClass),this._submitButton.removeAttribute("disabled")}setInitialFormState(){this._inputList.forEach((e=>{this._hideInputError(e)})),this._disableButton()}enableValidation(){this._form.addEventListener("submit",(e=>{e.preventDefault()})),this._setEventListeners()}}class c{constructor({items:e,renderer:t},s){this.items=e,this.renderer=t,this.containerEl=document.querySelector(s)}renderAll(){this.items.forEach((e=>{this.containerEl.append(this.renderer(e))}))}addItem(e){this.containerEl.prepend(e)}}class u{constructor(e){this._selector=e,this._popupEl=document.querySelector(e),this._handleEscClose=this._handleEscClose.bind(this),this._onOverlayClick=this._onOverlayClick.bind(this)}open(){this._popupEl.classList.add("popup_opened"),document.addEventListener("keydown",this._handleEscClose),document.addEventListener("mousedown",this._onOverlayClick)}close(){this._popupEl.classList.remove("popup_opened"),document.removeEventListener("keydown",this._handleEscClose),document.removeEventListener("mousedown",this._onOverlayClick)}_onOverlayClick(e){e.target.classList.contains("popup_opened")&&this.close()}_handleEscClose(e){"Escape"===e.key&&this.close()}setEventListeners(){this._popupEl.querySelector(".popup__close").addEventListener("click",(()=>this.close()))}}class d extends u{constructor(e,t){super(e),this._onFormSubmit=t,this._inputs=this._popupEl.querySelectorAll(".popup__input"),this._form=this._popupEl.querySelector(".popup__form")}_getInputValues(){const e={};return this._inputs.forEach((t=>{e[t.name]=t.value})),e}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{this._onFormSubmit(this._getInputValues()),e.preventDefault()}))}close(){super.close(),this._form.reset()}}const h=new class{constructor(e){this._options=e}_fetch(e,t){return fetch(this._options.baseUrl+e,{headers:this._options.headers,...t}).then((e=>e.ok?e.json():Promise.reject(`Ошибка: ${e.status}`)))}getUserInfo(){return this._fetch("/users/me")}getInitialCards(){return this._fetch("/cards")}updateUserInfo(e){return this._fetch("/users/me",{method:"PATCH",body:JSON.stringify(e)})}addNewCard(e){return this._fetch("/cards",{method:"POST",body:JSON.stringify(e)})}deleteCard(e){return this._fetch(`/cards/${e}`,{method:"DELETE"})}setLike(e){return this._fetch(`/cards/likes/${e}`,{method:"PUT"})}deleteLike(e){return this._fetch(`/cards/likes/${e}`,{method:"DELETE"})}changeAvatar(e){return this._fetch("/users/me/avatar",{method:"PATCH",body:JSON.stringify(e)})}}({baseUrl:"https://mesto.nomoreparties.co/v1/cohort-28",headers:{authorization:"b1cd0dc5-2b23-4623-93d8-d89ffc3baa40","Content-Type":"application/json"}});function _(e){return new a(e,"#cardTemplate",b.getUserId(),{handleCardClick:e=>{const t=e.target.getAttribute("src"),s=e.target.getAttribute("alt");v.open({src:t,alt:s})},handleCardDelete:(e,t)=>{L.open(e,t)},handleCardLike:(e,t,s)=>{s?h.deleteLike(e).then((e=>{t(e)})):h.setLike(e).then((e=>{t(e)}))}}).generateCard()}Promise.all([h.getInitialCards(),h.getUserInfo()]).then((([e,t])=>{const s=new c({items:e,renderer:_},".cards");b.setUserInfo(t),b.setUserId(t._id),s.renderAll()}));const p=new l(e,"form[name = 'profile']");p.enableValidation();const m=new l(e,"form[name = 'addCard']");m.enableValidation(),new l(e,"form[name = 'changeAvatar']").enableValidation();const v=new class extends u{constructor(e){super(e)}open({src:e,alt:t}){super.open();const s=this._popupEl.querySelector(".popup__img-gallery"),r=this._popupEl.querySelector(".popup__figcaption");s.setAttribute("src",e),s.setAttribute("alt",t),r.textContent=t}}("#popup-gallery");v.setEventListeners();const f=new d("#popup-profile",(function(e){h.updateUserInfo(e).then((e=>{b.setUserInfo(e),f.close()}))})),b=new class{constructor({nameSelector:e,aboutSelector:t,avatarSelector:s}){this.name=document.querySelector(e),this.about=document.querySelector(t),this.avatar=document.querySelector(s)}getUserInfo(){return{name:this.name.textContent,about:this.about.textContent,avatar:this.avatar.getAttribute("src")}}setUserInfo({name:e,about:t,avatar:s}){this.name.textContent=e,this.about.textContent=t,this.setUserAvatar(s)}setUserAvatar(e){this.avatar.setAttribute("src",e)}getUserId(){return this.userId}setUserId(e){this.userId=e}}({nameSelector:".profile__name",aboutSelector:".profile__description",avatarSelector:".profile__avatar"});f.setEventListeners();const E=new d("#popup-place",(function({place:e,url:t}){const s={name:e,link:t};h.addNewCard(s).then((e=>{new c({},".cards").addItem(_(e)),E.close()}))})),L=new class extends u{constructor(e,t){super(e),this._onFormSubmit=t,this._form=this._popupEl.querySelector(".popup__form")}open(e,t){this._cardId=e,this._afterFormSubmit=t,super.open()}setEventListeners(){super.setEventListeners(),this._form.addEventListener("submit",(e=>{e.preventDefault(),this._onFormSubmit(this._cardId,this._afterFormSubmit)}))}}("#popup-confirmation",(function(e,t){h.deleteCard(e).then((()=>{t(),L.close()}))}));L.setEventListeners();const C=new d("#popup-change-avatar",(function(e){h.changeAvatar(e).then((()=>{b.setUserAvatar(e.avatar),C.close()}))}));C.setEventListeners(),E.setEventListeners(),o.addEventListener("click",(function(){C.open()})),t.addEventListener("click",(function(){f.open(),function(){const e=b.getUserInfo();r.value=e.name,i.value=e.about,p.setInitialFormState()}()})),n.addEventListener("click",(function(){E.open(),m.setInitialFormState()}))})();