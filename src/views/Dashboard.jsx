import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col, Button } from "react-bootstrap";
import Display from "../components/Display/Display";
import axios from "axios";

import { Card } from "components/Card/Card.jsx";
import { StatsCard } from "components/StatsCard/StatsCard.jsx";
import { Tasks } from "components/Tasks/Tasks.jsx";
import {
  dataPie,
  legendPie,
  dataSales,
  optionsSales,
  responsiveSales,
  legendSales,
  dataBar,
  optionsBar,
  responsiveBar,
  legendBar,
  move_url,
  room_url,
  getItem_url,
  dropItem_url,
  getStatus_url
} from "variables/Variables.jsx";

const Dashboard = () => {
  const [room, setRoom] = useState();
  const [cooldown, setCooldown] = useState(0);
  const [coolErr, setCoolErr] = useState();
  const [status, setStatus] = useState({
    name: "",
    cooldown: 0,
    encumbrance: 0, // How much are you carrying?
    strength: 0, // How much can you carry?
    speed: 0, // How fast do you travel?
    gold: 0,
    bodywear: "None",
    footwear: "None",
    inventory: [],
    status: [],
    errors: [],
    messages: []
  });

  const coolTimer = cd => {
    cd = Math.ceil(cd);

    setCooldown(cd);
    let interval = setInterval(() => {
      console.log("cooldown: ", cd);
      cd -= 1;
      setCooldown(lastcool => lastcool - 1);
      if (cd <= 0) clearInterval(interval);
    }, 1000);
  };

  const move = way => {
    axios
      .post(
        move_url,
        { direction: way },
        {
          headers: {
            Authorization: "Token e79b12bf4f51c748e9edf3b395ad368c91c89ced"
          }
        }
      )
      .then(res => {
        console.log(res.data);
        setRoom(res.data);
        coolTimer(res.data.cooldown);
      })
      .catch(err => {
        console.log("in catch", err.response);
        let cd = err.response.data.cooldown;
        // const coolErr = err.response.data.cooldown.errors;
        coolTimer(cd);
        setCoolErr(err.response);
        console.log(coolErr);
      });
  };

  const getRoom = () => {
    axios
      .get(room_url, {
        headers: {
          Authorization: "Token e79b12bf4f51c748e9edf3b395ad368c91c89ced"
        }
      })
      .then(res => {
        console.log(res.data);
        setRoom(res.data);
      })
      .catch(err => {
        console.log(err.response);
        let cd = err.response.data.cooldown;
        // const coolErr = err.response.data.cooldown.errors;
        setCooldown(cd);
        coolTimer(cd);
        setCoolErr(err.response);
      });
  };

  const getItem = item => {
    axios
      .post(
        getItem_url,
        { name: item },
        {
          headers: {
            Authorization: "Token e79b12bf4f51c748e9edf3b395ad368c91c89ced"
          }
        }
      )
      .then(res => {
        console.log("getItem res.data", res.data);
        setRoom(res.data);
        coolTimer(res.data.cooldown);
      })
      .catch(err => {
        console.log(err.response);
        let cd = err.response.data.cooldown;
        // const coolErr = err.response.data.cooldown.errors;
        setCooldown(cd);
        coolTimer(cd);
        setCoolErr(err.response);
      });
  };

  const dropItem = item => {
    axios
      .post(
        dropItem_url,
        { name: item },
        {
          headers: {
            Authorization: "Token e79b12bf4f51c748e9edf3b395ad368c91c89ced"
          }
        }
      )
      .then(res => {
        console.log("dropItem res.data", res.data);
        setStatus(res.data);
        coolTimer(res.data.cooldown);
      })
      .catch(err => {
        console.log(err);
        let cd = err.response.data.cooldown;
        // const coolErr = err.response.data.cooldown.errors;
        setCooldown(cd);
        coolTimer(cd);
        setCoolErr(err.response);
      });
  };

  const getStatus = () => {
    axios
      .post(getStatus_url, null, {
        headers: {
          Authorization: "Token e79b12bf4f51c748e9edf3b395ad368c91c89ced"
        }
      })
      .then(res => {
        console.log("getStatus res.data", res.data);
        setStatus(res.data);
        coolTimer(res.data.cooldown);
      })
      .catch(err => {
        console.log(err.response);
        let cd = err.response.data.cooldown;
        // const coolErr = err.response.data.cooldown.errors;
        setCooldown(cd);
        coolTimer(cd);
        setCoolErr(err.response);
      });
  };

  useEffect(() => {
    getStatus();
    console.log("useEffect status", status);
  }, [room]);

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-gym text-danger" />}
              statsText="Strength"
              statsValue={status.strength}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-cash text-success" />}
              statsText="Gold"
              statsValue={status.gold}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-box1 text-warning" />}
              statsText="Inventory"
              statsValue={status.inventory.length ? status.inventory.length : 0}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-hourglass text-info" />}
              statsText="Cooldown"
              statsValue={cooldown}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
        </Row>
        <Row>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-anchor text-danger" />}
              statsText="Encumbrance"
              statsValue={status.encumbrance}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-clock text-info" />}
              statsText="Speed"
              statsValue={status.speed}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-shield text-primary" />}
              statsText="Body Armor"
              statsValue={status.bodywear}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-shield text-primary" />}
              statsText="Footwear"
              statsValue={status.footwear}
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
        </Row>
        <Display
          move={move}
          room={room}
          getRoom={getRoom}
          cooldown={cooldown}
          coolErr={coolErr}
          status={status}
          setStatus={setStatus}
          getItem={getItem}
        />

        <Row>
          <Col md={6}>
            <Card
              id="Inventory"
              title="Inventory"
              category="List of carried items"
              stats="Data information certified"
              statsIcon="fa fa-check"
              content={
                status.inventory.length > 0 ? (
                  status.inventory.map(item => (
                    <Button
                      onClick={() => dropItem(item)}
                      style={{
                        margin: "5px"
                      }}
                      className="btn btn-warning btn-sm"
                    >
                      {item}
                    </Button>
                  ))
                ) : (
                  <h3>"Your inventory is currently empty."</h3>
                )
              }
            />
          </Col>

          <Col md={6}>
            <Card
              title="Achievement Tracker"
              category="Track your goals"
              stats="Updated 3 minutes ago"
              statsIcon="fa fa-history"
              content={
                <div className="table-full-width">
                  <table className="table">
                    <Tasks />
                  </table>
                </div>
              }
            />
          </Col>
        </Row>
      </Grid>
    </div>
  );
};

export default Dashboard;
