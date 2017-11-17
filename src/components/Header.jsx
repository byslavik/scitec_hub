import React from "react";
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

import QuickSearch from "./search/QuickSearch";

require("./Header.scss");

import onClickOutside from 'react-onclickoutside';

class Header extends React.Component {
    constructor() {
      super();
      this.state = {
        isSearchActive: false,
        isMenuHidden: true
      }
    }
    handleClickOutside = evt => {
      if(this.state.isSearchActive) {
        this.setState({isSearchActive: false})
      }
      
      if(this.state.isMenuHidden) {
        this.setState({isSearchActive: false})
      }
    }
    toggleSearch() {
      this.setState({ isSearchActive: !this.state.isSearchActive });
    }
    toggleMenu() {
      this.setState({ isMenuHidden: !this.state.isMenuHidden });
    }
    componentWillReceiveProps(nextProps){
      if(this.props.pageTitle != nextProps.pageTitle) {
        if(document && nextProps.pageTitle){
          document.title = nextProps.pageTitle;
        }
      }
    }
    render() {
        return <header className="Header layout-container">
            <Link to="/" className="Header-logo link-no-text">SciTech</Link>
            <div className="hamburger" onClick={this.toggleMenu.bind(this)}>
                <div className="hamburger-stripe"></div>
            </div>

            <nav className={"Header-navigation" + (this.state.isMenuHidden ? ' hideMobile' : '')} role="navigation">
                <li><Link to="/Research" className={this.props.page.indexOf('Research') != '-1' ? 'active-link' : ''}>{this.props.lang.RESEARCH || 'Researches'}</Link></li>
                <li><Link to="/Companies" className={this.props.page.indexOf('Companies') != '-1' || this.props.page.indexOf('Startup') != '-1' ? 'active-link' : ''}>{this.props.lang.COMPANIES || 'Companies'}</Link></li>
                 <li className="about-project"><Link to="/Article/59b69a108b639c0ce1d52166">{this.props.lang.ABOUT_US || 'About Us'}</Link></li>
                <li><a href="#" className="link-no-text icon-search" onClick={this.toggleSearch.bind(this)}>{this.props.lang.SEARCH || 'Search'}</a></li>
                <li><a href="#" className="link-no-text plasma">Plasma +</a></li>
                <li className="lang-selector">
                    <a href="#" className={this.props.defaultLang == 'ru' ? "lang-active" : ""} onClick={this.props.setDefaultLang.bind(this,'ru')}>Ru</a>
                    <span>/</span>
                    <a href="#" className={this.props.defaultLang == 'en' ? "lang-active" : ""} onClick={this.props.setDefaultLang.bind(this, "en")}>En</a>
                </li>
            </nav>
         {this.state.isSearchActive ? <QuickSearch/> : null}
        </header>

    }
}

export default connect(
  state => ({
    lang: state.lang,
    defaultLang: state.defaultLang,
    pageTitle: state.pageTitle,
    page: (state.routing.location !== null ? state.routing.location.pathname : '')
  }),
  dispatch => ({
    setDefaultLang: (lang) => {
      let params = {
        type: 'langvars',
        query: lang
      }
      dispatch({ type: 'SET_DEFAULT_LANG', payload: lang });
      dispatch({type: "LANG_VARS", payload: {params: params, isLoader: false}});

    },
  })
)(onClickOutside(Header));
