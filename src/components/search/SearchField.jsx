import React from "react";
import { connect } from 'react-redux';
import { escapeHtml } from '../../utilities';

require("./SearchField.scss");

import { createAlert } from '../../actions/alerts';

class SearchField extends React.Component {
    smartSearch() {
      let q = escapeHtml(this.searchWord.value);

      if(q.length >= 250){
        this.props.onAlert({type: "error", text: (this.props.lang.ERR_TOO_LONG_QUERY || 'Your query is too long. The maximum length is 250 symbols')})
        
        return;
      }
      
      this.props.onSearch(q);
    }
    render() {
      
        return <div className="SearchField">
          <i className="icon-search"></i>
          <input type="text" name="searchQuery" onChange={this.smartSearch.bind(this)} ref={(input)=>{this.searchWord = input;}} className="SearchField--input" placeholder={this.props.lang.SEARCH || 'Search'} />
          <input type="button" className="Button Button--green" value={this.props.lang.SEARCH_BUTTON || 'Find'}/>
        </div>
    }
}

export default connect(
  state => ({ 
    lang: state.lang
   }),
  dispatch => ({
    onSearch: (searchWord) => {
      let params = {
        type: 'search',
        query: searchWord
      }
      dispatch({type: "SEARCH_WORD", payload: { params: params, isLoader: false}});
      dispatch({type: "SET_TERM", payload: searchWord});
    },
    onAlert: (params) => {
      dispatch(createAlert(params));
    }
  })
)(SearchField);