import React, { useEffect, useState } from "react";
import { history } from "@/router/history";
import { NavBar, CapsuleTabs, Button, Card, Modal, Popover } from "antd-mobile";
import { subscribeToPushNotifications } from '@/utils/notice';
import { cates } from "@/dict/cate";
import { useRecords } from "@/utils//db";
import "./Home.css";
import dayjs from "dayjs";
import logo from "../assets/logo.jpg";

const Home = () => {
  const [defaultActiveKey, setDefaultActiveKey] = useState("Wildlife");
  const [listData, setListData] = useState([]);
  const [user, setUser] = useState(null);

  const toCreateOrUpdate = (l) => {
    if (!user) {
      return Modal.alert({
        content: "Please login first (o_O) !",
        confirmText: "OK",
        onConfirm: () => {
          history.push("/login");
        },
      });
    } else {
      if (l?.id && l?.username !== user.name) {
        return Modal.alert({
          content: "Only the creator can edit ヽ(#`Д´)ﾉ",
          confirmText: "OK",
        });
      }
    }
    history.push(`/detail?id=${l?.id || ""}`);
  };

  const toLogin = () => {
    history.push(`/login`);
  };

  const logout = () => {
    localStorage.removeItem('user')
    toLogin()
  }

  const records = useRecords(defaultActiveKey);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    if (user) {
      setUser(user);
    }
    if (records) {
      const recordsWithLocation = records.map((record) => ({
        ...record,
        location: `${record.address}\nlatitude: ${record.latitude}\nlongitude: ${record.longitude}`,
      }));
      setListData(recordsWithLocation);
    }
  }, [defaultActiveKey, records]);

  useEffect(()=> {
    subscribeToPushNotifications().then(subscription => {
      console.log('Subscription completed:', subscription);
    }).catch(error => {
      console.error('Subscription failed:', error);
    });
  }, [])

  return (
    <div className="main">
      <div className="top">
        <NavBar
          back={<img className="logo" src={logo} alt="" />}
          backArrow={null}
          right={
            !user ? (
              <div style={{ fontSize: "1.2rem" }} onClick={toLogin}>
                Login
              </div>
            ) : (
              <div style={{ fontSize: "1.2rem" }} onClick={() => {
                Modal.alert({
                  content: 'Do you want to logout? (￢_￢)',
                  confirmText: 'Logout',
                  onConfirm: () => {
                    localStorage.removeItem('user'); 
                    history.push('/login'); 
                  },
                });
              }}>
                <span className="username">{user ? user.name : 'Login'}</span>
              </div>
            )
          }
        >
          <div className="project-title">Jiawei's Reporting App</div>
        </NavBar>
        <CapsuleTabs
          defaultActiveKey={defaultActiveKey}
          onChange={(key) => setDefaultActiveKey(key)}
        >
          {cates.map((t) => (
            <CapsuleTabs.Tab title={t.label} key={t.value}></CapsuleTabs.Tab>
          ))}
        </CapsuleTabs>
      </div>

      <div className="listbox">
        {listData && listData.length ? (
          listData.map((l, index) => (
            // 在 listData.map 方法中的 Card 元素中添加一个新的 div 元素来显示地址
            <Card key={index} title={<div>{l.title}</div>} className="listitem">
              <div>
                <div className="item">
                  <div className="itemlabel">Description:</div>
                  <div className="itemvalue">{l.desc}</div>
                </div>
                <div className="item">
                  <div className="itemlabel">Category:</div>
                  <div className="itemvalue">{l.category}</div>
                </div>
                <div className="item">
                  <div className="itemlabel">Location:</div>
                  <div className="itemvalue">{l.location}</div>
                </div>
                <div className="item">
                  <div className="itemlabel">Time:</div>
                  <div className="itemvalue">
                    {dayjs(l.time).format("DD/MM/YYYY HH:mm")}
                  </div>
                </div>
                <div className="item">
                  <div className="itemlabel">Image:</div>
                  <div className="itemvalue">
                    <img className="img" src={l.image} alt="" />
                  </div>
                </div>
                <div className="item">
                  <div className="itemlabel">Uploader:</div>
                  <div className="itemvalue">{l.username}</div>
                </div>
              </div>
              <div
                style={{ textAlign: "right" }}
                onClick={(e) => e.stopPropagation()}
              >
                <Button
                  size="small"
                  color="primary"
                  onClick={() => {
                    toCreateOrUpdate(l);
                  }}
                >
                  Edit
                </Button>
              </div>
            </Card>
          ))
        ) : (
          <div className="nodata">Nothing(｡•́︿•̀｡)</div>
        )}
      </div>

      <div className="bottombox">
        <Button color="primary" fill="solid" onClick={() => toCreateOrUpdate()}>
          Create
        </Button>
      </div>
    </div>
  );
};

export default Home;
