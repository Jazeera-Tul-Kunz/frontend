import React from "react";
import { Grid, Row, Col, Button } from "react-bootstrap";
import { Card } from "../Card/Card";

const Display = props => {
  console.log("props", props);
  const checkValidDir = dir => {
    if (props.room && props.room.exits.includes(dir)) {
      props.move(dir);
    }
  };
  return (
    <Row>
      <Col md={8}>
        <Card
          statsIcon="fa fa-history"
          id="GameDisplay"
          title={
            props.room === undefined ? (
              <Button
                onClick={() => props.getRoom()}
                className="btn btn-success btn-lg btn-block"
              >
                PLAY
              </Button>
            ) : (
              props.room && `Current Cooldown: ${props.cooldown}`
            )
          }
          category={
            props.room === undefined ? "" : "TIP: ALL ACTIONS INCREASE COOLDOWN"
          }
          stats={props.room && `Room ID: ${props.room.room_id}`}
          content={
            <div className="ct-chart">
              {props.room && (
                <Row>
                  <Col md={6}>
                    <h3>{`You enter the room and notice ${props.room.exits.length} doors in the following directions...`}</h3>
                    <h4>
                      {props.room.errors.length && props.cooldown > 0 ? (
                        <div>
                          <h4>{props.room.errors}</h4>
                        </div>
                      ) : (
                        props.room.exits.map(e => <>{e.toUpperCase()} </>)
                      )}
                    </h4>
                  </Col>
                  <Col md={6}>
                    <Card
                      id="RoomDescription"
                      statsIcon="fa fa-history"
                      title={props.room ? props.room.title : ""}
                      stats="filler"
                      category=""
                      content={
                        props.room === undefined ? "" : props.room.description
                      }
                    />
                    <Card
                      id="AvailableItems"
                      statsIcon="fa fa-history"
                      title={
                        props.room.items.length > 0
                          ? `Available Items (${props.room.items.length})`
                          : "Available Items"
                      }
                      stats="filler"
                      category={
                        props.room.items.length
                          ? props.room.items.map((item, i) => (
                              <>
                                <Button
                                  key={i}
                                  onClick={() => props.getItem(item)}
                                  style={{
                                    marginBottom: "2px",
                                    marginTop: "5px"
                                  }}
                                  className="btn btn-warning btn-sm"
                                >
                                  {`Pick up ${item}`}
                                </Button>
                                <br />
                              </>
                            ))
                          : "There doesn't seem to be any items in this room."
                      }
                      content={
                        <>
                          <div className="exits"></div>
                        </>
                      }
                    />
                  </Col>
                </Row>
              )}

              {props.cooldown > 1 && props.room === undefined && (
                <div>
                  <h4>
                    Too tired to move! Wait for the cooldown counter to reach
                    zero. It is located to the top right.
                  </h4>
                </div>
              )}
            </div>
          }
        />
      </Col>
      <Col md={4}>
        <Card
          statsIcon="fa fa-gamepad"
          title="Move"
          category="Traverse the map using these controls"
          stats="Navigate using cardinal directions"
          content={
            <div className="ct-chart ct-perfect-fourth">
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px"
                }}
              >
                <button
                  onClick={() => checkValidDir("n")}
                  type="button"
                  className="btn btn-primary btn-md"
                >
                  <i className="fa fa-angle-double-up fa-2x" />
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "2px"
                }}
              >
                <button
                  onClick={() => checkValidDir("w")}
                  style={{
                    marginRight: "5px"
                  }}
                  type="button"
                  className="btn btn-primary btn-md"
                >
                  <i className="fa fa-angle-double-left fa-2x" />
                </button>

                <button
                  onClick={() => checkValidDir("e")}
                  style={{
                    marginLeft: "5px"
                  }}
                  type="button"
                  className="btn btn-primary btn-md"
                >
                  <i className="fa fa-angle-double-right fa-2x" />
                </button>
              </div>
              <div
                style={{
                  display: "flex",
                  justifyContent: "center",
                  margin: "10px"
                }}
              >
                <button
                  onClick={() => checkValidDir("s")}
                  type="button"
                  className="btn btn-primary btn-md"
                >
                  <i className="fa fa-angle-double-down fa-2x" />
                </button>
              </div>
            </div>
          }
        />
      </Col>
    </Row>
  );
};

export default Display;
