import React from 'react';
import { Row } from 'react-bootstrap';
import GoogleMap from '../GoogleMap/GoogleMap';

const ShowSearchForm = (props) => {
    return (
        <Row>
            <div className="col-lg-4 col-md-4 col-sm-5 col-xs-12 left-box">
                <div className="inner-box">
                    <form onSubmit={props.handleSearch}>
                        <div className="form-group">
                            <label htmlFor="from">Pick From </label>
                            <input  type="text" id="from" onBlur={props.handDestination} className="form-control" name="from" placeholder="Your Location"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="to">To</label>
                            <input  type="text" id="to" onBlur={props.handDestination} className="form-control" name="to" placeholder="Destination"/>
                        </div>
                        <div className="form-group">
                            <label htmlFor="journeyDate">Journey Date</label>
                            <input  type="date" id="journeyDate" onChange={props.handDestination} className="form-control" name="journeyDate" placeholder="Pick a date"/>
                        </div>
                        <div className="form-group">
                            <input className="btn btn-primary" type="submit" value="search"/>
                        </div>
                    </form>
                </div>
                
            </div>
            
            <div className="col-lg-8 col-md-8 col-sm-7 col-xs-12 right-box">
                <GoogleMap></GoogleMap>
            </div>
        </Row>
    );
};

export default ShowSearchForm;