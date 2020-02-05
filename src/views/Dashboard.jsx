import React, { useEffect, useState } from "react";
import ChartistGraph from "react-chartist";
import { Grid, Row, Col } from "react-bootstrap";
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
  room_url
} from "variables/Variables.jsx";

const Dashboard = () => {
  const [room, setRoom] = useState();
  const [cooldown, setCooldown] = useState(0);
  const [coolErr, setCoolErr] = useState("");

  const coolTimer = cd => {
    cd = Math.ceil(cd);
    console.log(cd);
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
            Authorization: "Token e91091807dc50e6bf25669440c1b4fc3ebaf2aaa"
          }
        }
      )
      .then(res => {
        setRoom(res.data);
      })
      .catch(err => {
        console.log("in catch", err.response);
        let cd = err.response.data.cooldown;
        const coolErr = err.response.data.cooldown.errors;
        coolTimer(cd);
        setCoolErr(coolErr);
      });
  };

  const getRoom = () => {
    axios
      .get(room_url, {
        headers: {
          Authorization: "Token e91091807dc50e6bf25669440c1b4fc3ebaf2aaa"
        }
      })
      .then(res => {
        console.log(res.data);
        setRoom(res.data);
      })
      .catch(err => {
        console.log(err.response);
        let cd = err.response.data.cooldown;
        const coolErr = err.response.data.cooldown.errors;
        // setCooldown(cd)
        coolTimer(cd);
        setCoolErr(coolErr);
      });
  };

  return (
    <div className="content">
      <Grid fluid>
        <Row>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-gym text-danger" />}
              statsText="Strength"
              statsValue="10"
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-cash text-success" />}
              statsText="Gold"
              statsValue="345"
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-box1 text-warning" />}
              statsText="Inventory"
              statsValue="5"
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
              statsValue="10"
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-clock text-info" />}
              statsText="Speed"
              statsValue="8"
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-shield text-primary" />}
              statsText="Body Armor"
              statsValue="None"
              statsIcon={<i className="fa fa-refresh" />}
              statsIconText="Update"
            />
          </Col>
          <Col lg={3} sm={6}>
            <StatsCard
              bigIcon={<i className="pe-7s-shield text-primary" />}
              statsText="Footwear"
              statsValue={cooldown}
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
        />

        <Row>
          <Col md={6}>
            <Card
              id="Inventory"
              title="Inventory"
              category="List of carried items"
              stats="Data information certified"
              statsIcon="fa fa-check"
              content={<div className="ct-chart">INVENTORY HERE</div>}
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
