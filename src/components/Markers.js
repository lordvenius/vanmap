import React, { Component } from "react";
import { connect } from "react-redux";
import { getItems, deleteItem } from "../actions/itemActions";
import { PropTypes } from "prop-types";
import {
    Marker,
    InfoWindow
} from "@react-google-maps/api";
import vanLogo from "../media/van-3.png";



class Markers extends Component {

    constructor(props) {
        super(props);
        this.state = {
            isOpen: false,

        }
    };

    // When component mounts redux function getItems runs and marker component gets marker data from props 
    componentDidMount() {
        this.props.getItems();
    }

    //toggle = () => {
    //    this.setState({
    //        isOpen: !this.state.isOpen
    //    })
    //}

    // Parent function to set selected marker
    setSelectedItem = (item) => {
        //if (this.props.selectedItem != item) {
        this.props.setSelectedItem(item);
        //} else if (this.props.selectedItem = item) {
        //    this.props.setSelectedItem(null);
        //}
    }

    // delete marker on DB and unselect it in parent
    onDeleteClick = (id) => {
        this.props.deleteItem(id);
        this.props.setSelectedItem(null)
    };

    // mapping through items array in props and creates all markers stored in DB
    returnFunc = () => {
        return (
            <div>

                {(this.props.item.items.map(item => (
                    <Marker
                        key={item._id}
                        position={{
                            lat: item.lat,
                            lng: item.lng
                        }}

                        onClick={() => {
                            this.setSelectedItem(item);
                        }}
                        icon={{
                            url: vanLogo,
                            scaledSize: new window.google.maps.Size(40, 40),
                            origin: new window.google.maps.Point(0, 0),
                            anchor: new window.google.maps.Point(15, 15)
                        }}
                    />
                )))}


                {this.props.selectedItem && (
                    <InfoWindow
                        className="info-window"
                        onCloseClick={() => {
                            this.setSelectedItem(null);
                        }}

                        //infoWindowOptions={{
                        //    pixelOffset: {
                        //        origin: new window.google.maps.Point(0, 0),
                        //        anchor: new window.google.maps.Point(200, 0)
                        //    }
                        //}}
                        //pixelOffset={new window.google.maps.Size(200, 0)}
                        position={{
                            lat: this.props.selectedItem.lat,
                            lng: this.props.selectedItem.lng,
                        }}
                    >
                        <div>
                            <h2>{this.props.selectedItem.title}</h2>
                            <p>{this.props.selectedItem.description}</p>
                            <button onClick={() => {
                                this.onDeleteClick(this.props.selectedItem._id)
                            }}>DELETE</button>
                        </div>
                    </InfoWindow>
                )
                }

            </div>)

    }


    render() {

        return this.returnFunc()
    }
}

Markers.propTypes = {
    getItems: PropTypes.func.isRequired,
    item: PropTypes.object.isRequired
}

const mapStateToProps = (state) => ({
    item: state.item
});

export default connect(mapStateToProps, { getItems, deleteItem })(Markers);

