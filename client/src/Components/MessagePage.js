import React, { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from 'prop-types';
import {getMessage} from '../Actions/index'

const MessagePage = ({getMessage,message}) => {

    useEffect(()=>{
        getMessage()
    })
    return(
        <div>
            <div className="display-4">
                <center>{message ? message : "Not connected to backend apis yet"}</center>
                <center>This is the generic message</center>
            </div>
        </div>
    )
}

MessagePage.propTypes = {
    getMessage: PropTypes.func.isRequired,
    message: PropTypes.string,
    // errors:  PropTypes.object
};
  
const mapStateToProps = state => ({
    // errors: state.auth.errors,
    // user: state.auth.user
    message: state.init.message
});
  
export default connect(mapStateToProps, { getMessage })(MessagePage);