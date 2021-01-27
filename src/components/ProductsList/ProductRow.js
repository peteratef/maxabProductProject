import React from "react";
import Switch from "react-switch";
class ProductCard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    var { item } = this.props;

    return (
      <>
        <tr key={item.id}>
          <td>{item.id}</td>
          <td>
            {" "}
            <img width="50px" src={item.img} alt={item.nameEng} />
          </td>
          <td>{item.nameEng}</td>
          <td>{item.nameArb}</td>
          <td>
            <div className="switchClass">
              <Switch
                height={20}
                onChange={() =>
                  this.props.onActivateDeActivate(item.id, item.activation)
                }
                checked={item.activation === "true" ? true : false}
              />{" "}
            </div>
            <div
              className="tableEditDelete"
              onClick={() => this.props.onEditItem(item.id)}
            >
              || edit ||
            </div>
            <div
              className="tableEditDelete"
              onClick={() => this.props.onDeleteProduct(item.id)}
              style={{ color: "red" }}
            >
              delete
            </div>
          </td>
        </tr>
      </>
    );
  }
}

export default ProductCard;
