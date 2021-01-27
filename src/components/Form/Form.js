import React, { Component } from "react";
import { connect } from "react-redux";

import "./Form.css";
import * as Actions from "../actions/productActions";

class Form extends Component {
  constructor() {
    super();
    this.state = {
      id: "",
      nameEng: "",
      nameArb: "",
      activation: "false",
      img: "",
      errors: {},
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleChangeImage = this.handleChangeImage.bind(this);
  }
  handleValidation() {
    let fields = this.state;
    let errors = {};
    let formIsValid = true;
    var isArabic = /[\u0600-\u06FF\u0750-\u077F]/;
    var engLetters = /^[A-Za-z]/;
    let arabicContainEnglish = false;
    if (!fields["nameEng"]) {
      formIsValid = false;
      errors["nameEng"] = "You must add English product name";
    }
    if (isArabic.test(fields["nameEng"])) {
      formIsValid = false;
      errors["nameEng"] = "English Name can't have arabic letters";
    }
    if (!fields["nameArb"]) {
      formIsValid = false;
      errors["nameArb"] = "You must add Arabic product name";
    }
    if (fields["nameArb"].match(engLetters) && fields["nameArb"]) {
      formIsValid = false;
      errors["nameArb"] = "Arabic Name can't have English letters";
    }

    this.setState({ errors: errors });
    return formIsValid;
  }
  componentDidMount() {
    if (typeof this.props.match.params.id == "undefined") {
    } else {
      const editedId = this.props.match.params.id;
      let editableItem = this.props.items.find(
        (item) => item.id === parseInt(editedId)
      );

      this.setState({
        id: editedId,

        nameEng: editableItem.nameEng,
        nameArb: editableItem.nameArb,
        activation: editableItem.activation,
        img: editableItem.img,
      });
    }
  }
  handleChangeImage(event) {
    this.setState({
      img: URL.createObjectURL(event.target.files[0]),
    });
  }
  handleChange(e) {
    let change = {};
    change[e.target.name] = e.target.value;

    this.setState(change);
  }

  render() {
    return (
      <div className="container">
        <form
          onSubmit={(e) => {
            e.preventDefault();

            this.handleValidation();

            if (!this.handleValidation()) {
            } else {
              this.state.id > 0
                ? this.props.editProduct(this.state)
                : this.props.addProduct(this.state);
              this.props.history.push("/");
            }
          }}
        >
          <h3> {this.state.id > 0 ? "Edit Menu Item" : "Add Menu Item"}</h3>
          <center>
            <h6 style={{ color: "red" }}>{this.props.errorMessage}</h6>
          </center>

          <input type="hidden" name="id" value={this.state.id} />

          <div className="mainFormDiv">
            <div className="formTitle">
              <label>Name (eng)</label>
            </div>
            <div className="formInput">
              <input
                name="nameEng"
                placeholder="Product Name(eng)"
                value={this.state.nameEng}
                onChange={this.handleChange}
              />
              <span style={{ color: "red" }}>
                {this.state.errors["nameEng"]}
              </span>
            </div>
          </div>
          <div className="mainFormDiv">
            <div className="formTitle">
              <label>Name (Arb)</label>
            </div>
            <div className="formInput">
              <input
                name="nameArb"
                placeholder="Product Name (Arb)"
                value={this.state.nameArb}
                onChange={this.handleChange}
              />
              <span style={{ color: "red" }}>
                {this.state.errors["nameArb"]}
              </span>
            </div>
          </div>

          <div className="mainFormDiv">
            <div className="formTitle">
              <label>Photo</label>
            </div>
            <div className="formInput">
              <input type="file" onChange={this.handleChangeImage} />
              <img
                src={this.state.img}
                alt={this.state.img}
                width="200px;"
                style={{ marginTop: "10px" }}
              />
            </div>
          </div>
          <div className="mainFormDiv">
            <div className="formTitle">
              <label>Activation</label>
            </div>
            <div
              className="formInputbtn-group"
              data-toggle="buttons"
              onChange={this.handleChange}
            >
              <label>
                <div className="radioDiv">
                  <input
                    checked={this.state.activation === "true" ? true : null}
                    type="radio"
                    className="radioOpacity"
                    name="activation"
                    value="true"
                  />{" "}
                  <div className="radioTitle"> Active</div>
                </div>
              </label>
              <label>
                <div className="radioDiv">
                  <input
                    checked={this.state.activation === "false" ? true : null}
                    className="radioOpacity"
                    type="radio"
                    name="activation"
                    value="false"
                  />{" "}
                  <div className="radioTitle"> Not Active</div>
                </div>
              </label>
            </div>
          </div>

          <div className="mainFormDiv">
            <button type="submit" className="waves-effect waves-light btn">
              {this.state.id > 0 ? "Update Item" : "Save Item"}
            </button>
          </div>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    items: state.items,
    //addedItems: state.addedItems
  };
};
const mapDispatchToProps = (dispatch) => {
  return {
    addProduct: (formValues) => {
      dispatch(Actions.addProduct(formValues));
    },
    editProduct: (formValues) => {
      dispatch(Actions.editProduct(formValues));
    },
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Form);
