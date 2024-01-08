import React, { useState, useEffect } from "react";
import ChartComponent from "./components/ChartComponent";
import "./app.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleInfo,
  faRotateRight,
  faEllipsis,
  faClock,
  faCalendar,
} from "@fortawesome/free-solid-svg-icons";
import fakeDailyData from "./fake-daily-data.json";
import fakeHourlyData from "./fake-hourly-data.json";

export default function App() {
  const [showOption, setShowOption] = useState(false);
  const [dataType, setDataType] = useState("Daily"); // hourly
  const [data, setData] = useState(fakeDailyData);

  useEffect(() => {
    if (dataType === "Daily") return setData(fakeDailyData);
    if (dataType === "Hourly") return setData(fakeHourlyData);
  }, [dataType]);

  const dataMix = () => {
    let newData = new Object();

    newData.sqlInjection = data.data.sqlInjection.sort(
      () => Math.random() - 0.5
    );
    newData.authBroken = data.data.authBroken.sort(() => Math.random() - 0.5);
    newData.xss = data.data.xss.sort(() => Math.random() - 0.5);
    newData.line = data.data.line.sort(() => Math.random() - 0.5);

    newData = {
      ...data,
      data: newData,
      totalSqlInjection: Math.floor(Math.random() * 200),
      totalAuthBroken: Math.floor(Math.random() * 200),
      totalBlocked: Math.floor(Math.random() * 400 + 100),
      totalXSS: Math.floor(Math.random() * 200),
    };

    setData(newData);
  };

  return (
    <div className="app-container">
      <div className="card">
        <div className="section-1">
          <div>
            <span className="bold-text">Total Blocked</span>
            <span className="icon d-flex align-items-center">
              <object
                style={{ width: "20px" }}
                data="info.svg"
                type="image/svg+xml"
              ></object>
            </span>
          </div>

          <div
            style={{ cursor: "pointer", color: "rgb(94 94 94)", width: "20px" }}
            onClick={dataMix}
          >
            <FontAwesomeIcon icon={faRotateRight} size="xl" />
          </div>
        </div>

        <div className="section-2">
          <div>
            <div className="cs-icon ">
              <object
                data="block.svg"
                className="blocked"
                type="image/svg+xml"
              ></object>
            </div>
            <div>
              <div className="title-text-1">Total Blocked</div>
              <div className="light-bold-text-cs">{data.totalBlocked}M</div>
            </div>
          </div>

          <div>
            <div className="cs-icon ">
              <object
                data="bug1.svg"
                className="bug1"
                type="image/svg+xml"
              ></object>
            </div>
            <div>
              <div className="title-text">SQL Injection</div>
              <div className="dark-bold-text-cs">{data.totalSqlInjection}M</div>
            </div>
          </div>

          <div>
            <div className="cs-icon">
              <object
                data="bug2.svg"
                className="bug2"
                type="image/svg+xml"
              ></object>
            </div>
            <div>
              <div className="title-text">Auth Broken</div>
              <div className="dark-bold-text-cs">{data.totalAuthBroken}M</div>
            </div>
          </div>

          <div>
            <div className="cs-icon">
              <object
                data="bug3.svg"
                className="bug3"
                type="image/svg+xml"
              ></object>
            </div>
            <div>
              <div className="title-text">XSS</div>
              <div className="dark-bold-text-cs">{data.totalXSS}M</div>
            </div>
          </div>
        </div>

        <div className="section-3">
          <span className="text-css-1">1 - 30 Sep, 2021</span>
          <span onClick={() => setShowOption(!showOption)}>
            <b className="text-secondary mx-4">{dataType}</b>
            <FontAwesomeIcon icon={faEllipsis} size="xl" />
            {showOption && (
              <div className="options">
                <div
                  className={dataType === "Daily" && "selected-option-top"}
                  onClick={() => setDataType("Daily")}
                >
                  <FontAwesomeIcon icon={faCalendar} size="md" /> Daily
                </div>

                <div
                  className={dataType === "Hourly" && "selected-option-bottom"}
                  onClick={() => setDataType("Hourly")}
                >
                  <FontAwesomeIcon icon={faClock} size="md" /> Hourly
                </div>
              </div>
            )}
          </span>
        </div>

        <ChartComponent data={data} />
      </div>
    </div>
  );
}
