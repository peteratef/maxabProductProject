import React, { Component } from "react";
import { connect } from "react-redux";

import * as actions from "../actions/productActions";
import Pagination from "../Pagination/Pagination";
import ProductRow from "./ProductRow";
import "./ProductsList.css";
class ProductsList extends Component {
  constructor(props) {
    super(props);
    var exampleItems = this.props.items;

    this.state = {
      inputValue: "",
      depSelectedValue: "select_activation",
      exampleItems: exampleItems,
      pageOfItems: [],
    };
    this.onChangePage = this.onChangePage.bind(this);
  }
  onChangePage(pageOfItems) {
    // update state with new page of items
    this.setState({ pageOfItems: pageOfItems });
  }
  componentDidMount() {
    this.props.onInitFunction("");
  }
  componentDidUpdate(prevProps) {}
  handleDepChange = (value) => {
    let inputValuee = value.target.value;

    this.setState({ depSelectedValue: inputValuee });

    this.props.onChangeFilter(this.state.inputValue, inputValuee);
  };
  handleInputChange = (value) => {
    let inputValueq = value.target.value;
    this.setState({ inputValue: inputValueq });

    this.props.onChangeFilter(inputValueq, this.state.depSelectedValue);
  };
  render() {
    let itemList = this.state.pageOfItems.map((item) => {
      return (
        <ProductRow
          key={item.id}
          item={item}
          onDeleteProduct={(id) => {
            this.props.deleteProduct(id);
          }}
          onActivateDeActivate={(id, status) => {
            this.props.activateDeactivateFn(id, status);
          }}
          onEditItem={(id) => {
            // this.props.editItem(id);
            this.props.history.push(`/cart/edit/${id}`);
          }}
        />
      );
    });

    return (
      <div className="container">
        <div className="search">
          <div className="searchFor">
            <input
              className="input_field"
              type="text"
              placeholder="search For Product"
              onChange={this.handleInputChange}
              value={this.state.inputValue}
            />
          </div>
          <div>
            <select
              className="input_field"
              onChange={this.handleDepChange}
              value={this.state.depSelectedValue}
            >
              <option value="select_activation">Select Activation</option>
              <option value="true">Activated</option>
              <option value="false">Not Activated</option>
            </select>
          </div>
        </div>
        <h3 className="center">Menu Items</h3>

        {/* <div className="box">{itemList}</div> */}
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Image</th>
              <th>Eng Name</th>
              <th>Arabic Name</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>{itemList}</tbody>
        </table>
        <center>
          <div className="text-center">
            <Pagination
              items={
                this.state.inputValue.length > 0 ||
                this.state.depSelectedValue !== "select_activation"
                  ? this.props.fitlteredItems
                  : this.props.items
              }
              depSelectedValue={this.state.depSelectedValue}
              inputValue={this.state.inputValue}
              onChangePage={this.onChangePage}
            />
          </div>
        </center>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    items: state.items,
    fitlteredItems: state.fitlteredItems,
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    onInitFunction: (mainObject) => dispatch(actions.initFunction(mainObject)),
    activateDeactivateFn: (id, status) => {
      dispatch(actions.activateDeactivate(id, status));
    },
    deleteProduct: (id) => {
      dispatch(actions.deleteProduct(id));
    },
    onChangeFilter: (inputValue, selectedValue) =>
      dispatch(actions.changeFilter(inputValue, selectedValue)),
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProductsList);
