import React, { useEffect, useState } from "react";
import { history, getParmas } from "@/router/history";
import { NavBar, Form, Input, Button, DatePicker, Selector, Toast } from "antd-mobile";
import dayjs from "dayjs";
import WebcamCapture from "@/components/WebcamCapture";
import { getCurrentPositionWithAddress } from "@/utils/navigator";
import { getDeviceDirection, getDeviceTilt } from "@/utils/device";
import { cates } from "@/dict/cate";
import "./Detail.css";
import {
  addRecord,
  deleteRecord,
  updateRecord,
  getRecordById,
} from "@/utils/db"; 
import "./Home.css";

const Detail = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const id = getParmas("id") ? Number(getParmas("id")) : "";
  const [form] = Form.useForm();
  const [title, setTitle] = useState("Create");
  const [detail, setDetail] = useState({
    time: new Date(),
    username: user.name
  });

  const getPosition = () => {
    const apiKey = import.meta.env.VITE_REACT_APP_GOOGLE_MAPS_API_KEY;

    getCurrentPositionWithAddress(apiKey).then(({ latitude, longitude, address }) => {
      Toast.show({
        icon: 'success',
        content: `Success getting position with address`,
      })
      setDetail(prevDetail => ({
        ...prevDetail,
        longitude: longitude,
        latitude: latitude,
        address: address
      }));
    }).catch(error => {
      Toast.show({
        icon: 'fail',
        content: `Error getting position with address:${error}`,
      })
      console.error('Error getting position with address:', error);
    });
  };
  
  const getDeviceOpts = () => {
    getDeviceDirection().then((options) => {
      console.log(options);
      setDetail((pre) => ({
        ...pre,
        direction: options.direction,
      }));
    }).catch(error => {
      Toast.show({
        icon: 'fail',
        content: `getDeviceDirection fail`,
      })
    });
    getDeviceTilt().then((options) => {
      console.log(options);
      setDetail((pre) => ({
        ...pre,
        tilt: options.tilt,
      }));
    }).catch(error => {
      Toast.show({
        icon: 'fail',
        content: `getDeviceTilt fail`,
      })
    });
  };

  const updatePosition = () => {
    getPosition(); 
  };

  const onBack = () => {
    history.back();
  };

  const onFinish = async (values) => {
    values.category = values.category[0];
    values = {
      ...detail,
      ...values,
    };
    console.log(values);
    const fn = id ? updateRecord : addRecord;
    await fn(values);
    onBack();
  };

  const getForm = async (id) => {
    const detail = await getRecordById(id);
    detail.category = [detail.category];
    setDetail(detail);
    form.setFieldsValue({
      ...detail,
    });
  };

  const del = async () => {
    await deleteRecord(id);
    onBack();
  };

  useEffect(() => {
    if (id) {
      setTitle("Edit");
      getForm(id);
    } else {
      getPosition();
      getDeviceOpts();
    }
  }, []);

  return (
    <div>
      <NavBar onBack={onBack}>{title}</NavBar>

      <Form
        name="form"
        form={form}
        initialValues={detail}
        onFinish={onFinish}
        footer={
          <>
            <Button block type="submit" color="primary" size="large">
              Submit
            </Button>
            <Button
              onClick={del}
              style={{ marginTop: "10px" }}
              block
              color="danger"
              size="large" 
            >
              Delete
            </Button>
          </>
        }
      >

        <Form.Item name="title" label="Title" rules={[{ required: true }]}>
          <Input placeholder="Title" />
        </Form.Item>
        <Form.Item name="desc" label="Description">
          <Input placeholder="Description" />
        </Form.Item>
        <Form.Item name="image" label="Image">
          <WebcamCapture
            url={detail.image}
            onCapture={(image) => form.setFieldsValue({ image })}
          />
        </Form.Item>
        <Form.Item
          name="time"
          label="Time"
          trigger="onConfirm"
          rules={[{ required: true }]}
          onClick={(e, datePickerRef) => {
            var _a;
            (_a = datePickerRef.current) === null || _a === void 0
              ? void 0
              : _a.open();
          }}
        >
          <DatePicker
            precision="minute"
            locale={{ dateLocale: 'en', dateFormat: 'DD/MM/YYYY HH:mm' }}
          >
            {(value) =>
              value
                ? dayjs(value).format("DD/MM/YYYY HH:mm")
                : dayjs().format("DD/MM/YYYY HH:mm")
            }
          </DatePicker>

        </Form.Item>
        <Form.Item
          name="category"
          label="Category"
          rules={[{ required: true }]}
        >
          <Selector columns={2} options={cates} />
        </Form.Item>
        <Form.Item label="Location">
        <div className="flexbox">
          <div>
            <div>{detail.address || 'Address will be displayed here.'}</div>
            <div>Latitude: {detail.latitude}</div>
            <div>Longitude: {detail.longitude}</div>
          </div>
        <div>
            <Button
              className="btn"
              block
              fill="outline"
              color="success"
              size="small"
              shape="rounded"
              onClick={() => getPosition()}
            >
              Update
            </Button>
          </div>
        </div>
        </Form.Item>

        <Form.Item label="Device Orientation and Movement">
          <div className="flexbox">
            <div>
            <div>Orientation: {detail.direction}</div>
            <div>Tilt and Gravity: {detail.tilt}</div>
            </div>
            <Button
              className="btn"
              block
              fill="outline"
              color="success"
              size="small"
              shape="rounded"
              onClick={() => getDeviceOpts()}
            >
              Update
            </Button>
          </div>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Detail;
