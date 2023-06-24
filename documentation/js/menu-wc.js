'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">whattosee-ui documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-bs-toggle="collapse" ${ isNormalMode ?
                                'data-bs-target="#modules-links"' : 'data-bs-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/AppModule.html" data-type="entity-link" >AppModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ?
                                            'data-bs-target="#components-links-module-AppModule-7532b5883a9ce1a5bb01c55f21e070077f1fc2441a3254ebbc0341c666e1709d9e8af641297de78e8c5125d710f4afa34f828708de3a4df04ab45a9da1269821"' : 'data-bs-target="#xs-components-links-module-AppModule-7532b5883a9ce1a5bb01c55f21e070077f1fc2441a3254ebbc0341c666e1709d9e8af641297de78e8c5125d710f4afa34f828708de3a4df04ab45a9da1269821"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-AppModule-7532b5883a9ce1a5bb01c55f21e070077f1fc2441a3254ebbc0341c666e1709d9e8af641297de78e8c5125d710f4afa34f828708de3a4df04ab45a9da1269821"' :
                                            'id="xs-components-links-module-AppModule-7532b5883a9ce1a5bb01c55f21e070077f1fc2441a3254ebbc0341c666e1709d9e8af641297de78e8c5125d710f4afa34f828708de3a4df04ab45a9da1269821"' }>
                                            <li class="link">
                                                <a href="components/AdministratorPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AdministratorPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/AppComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >AppComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ConversationPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ConversationPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/GuidePageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >GuidePageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/LoginPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >LoginPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/MessagesCenterPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >MessagesCenterPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotAuthorizedPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotAuthorizedPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/NotFoundPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >NotFoundPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ProblemsDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ProblemsDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/RegisterPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >RegisterPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReportDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReportDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReviewCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/ReviewDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >ReviewDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/SearchPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >SearchPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StarRatingComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StarRatingComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StopCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/StopEditorDialogComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >StopEditorDialogComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TourCardComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TourCardComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TourEditorPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TourEditorPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TourPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TourPageComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/TouristPageComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >TouristPageComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/AppRoutingModule.html" data-type="entity-link" >AppRoutingModule</a>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#classes-links"' :
                            'data-bs-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/Utils.html" data-type="entity-link" >Utils</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#injectables-links"' :
                                'data-bs-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/ConversationService.html" data-type="entity-link" >ConversationService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/TourService.html" data-type="entity-link" >TourService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UserService.html" data-type="entity-link" >UserService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interceptors-links"' :
                            'data-bs-target="#xs-interceptors-links"' }>
                            <span class="icon ion-ios-swap"></span>
                            <span>Interceptors</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="interceptors-links"' : 'id="xs-interceptors-links"' }>
                            <li class="link">
                                <a href="interceptors/ErrorInterceptor.html" data-type="entity-link" >ErrorInterceptor</a>
                            </li>
                            <li class="link">
                                <a href="interceptors/HeadersInterceptor.html" data-type="entity-link" >HeadersInterceptor</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#guards-links"' :
                            'data-bs-target="#xs-guards-links"' }>
                            <span class="icon ion-ios-lock"></span>
                            <span>Guards</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="guards-links"' : 'id="xs-guards-links"' }>
                            <li class="link">
                                <a href="guards/AuthGuard.html" data-type="entity-link" >AuthGuard</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#interfaces-links"' :
                            'data-bs-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/City.html" data-type="entity-link" >City</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Conversation.html" data-type="entity-link" >Conversation</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ConversationDTO.html" data-type="entity-link" >ConversationDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Message.html" data-type="entity-link" >Message</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/MessageDTO.html" data-type="entity-link" >MessageDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Report.html" data-type="entity-link" >Report</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReportDTO.html" data-type="entity-link" >ReportDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Review.html" data-type="entity-link" >Review</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ReviewDTO.html" data-type="entity-link" >ReviewDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Stop.html" data-type="entity-link" >Stop</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/StopDTO.html" data-type="entity-link" >StopDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tag.html" data-type="entity-link" >Tag</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TagDTO.html" data-type="entity-link" >TagDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Theme.html" data-type="entity-link" >Theme</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Tour.html" data-type="entity-link" >Tour</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TourActions.html" data-type="entity-link" >TourActions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TourDTO.html" data-type="entity-link" >TourDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/TourSearchDTO.html" data-type="entity-link" >TourSearchDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/User.html" data-type="entity-link" >User</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserLoginDTO.html" data-type="entity-link" >UserLoginDTO</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UserRegisterDTO.html" data-type="entity-link" >UserRegisterDTO</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-bs-toggle="collapse" ${ isNormalMode ? 'data-bs-target="#miscellaneous-links"'
                            : 'data-bs-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <a data-type="chapter-link" href="routes.html"><span class="icon ion-ios-git-branch"></span>Routes</a>
                        </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank" rel="noopener noreferrer">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});