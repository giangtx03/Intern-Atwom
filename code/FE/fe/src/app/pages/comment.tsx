import React, { useEffect, useRef, useState } from "react";
import CommentService from "../service/CommentService";
import { FaStar } from "react-icons/fa";
import "../../App.css";
import dayjs from "dayjs";
import Search from "../model/SearchModel";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import Comment from "../model/Comment";
import { Toast } from "primereact/toast";
import swal from "sweetalert";
import AddAndUpdate from "./addAndUpdate";
import { Dialog } from "primereact/dialog";
import { Image } from "primereact/image";
import { TokenService } from "../service/TokenService";
import { error } from "console";
import { useAppSelector } from "../store/hooks";
import { DecodedToken } from "../model/User";
import { decodeToken } from "react-jwt";
import { Rating, RatingChangeEvent } from "primereact/rating";
import { Paginator } from "primereact/paginator";
import { Dropdown, DropdownChangeEvent } from "primereact/dropdown";
import defaultAvatar from "../../assets/image/defaultAvatar.jpg";
import { ToastContainer, toast, ToastPosition } from "react-toastify";
import { Menu } from "primereact/menu";
import { PrimeIcons } from "primereact/api";
import { Avatar } from "primereact/avatar";

interface Options {
  select: string;
  values: string;
}

interface Order {
  name: string;
  type: string;
}

export default function CommentDisplay(props: any) {
  const { pitch_id, handleChange } = props;
  const [lstComment, setLstComment] = useState([]);
  const [search, setSearch] = useState(new Search("", 3, 1, 1, 100));
  const [editOn, setEditOn] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<Comment | undefined>(
    undefined
  );
  const [selectComment, setSelectComment] = useState(Object);
  const [total, setTotal] = useState<number>(0);
  const [selectOption, setSelectOption] = useState<Options>({
    select: "Tất cả đánh giá",
    values: "",
  });
  const [selectOrder, setSelectOrder] = useState<Order | null>(null);
  const user_id = decodeToken<DecodedToken>(
    TokenService.getInstance().getToken()
  )?.user_id;

  const options: Options[] = [
    { select: "Tất cả đánh giá", values: "" },
    { select: "Đánh giá của bạn", values: `${user_id}` },
  ];
  const order: Order[] = [
    { name: "Tốt nhất", type: "DESC" },
    { name: "Tệ nhất", type: "ASC" },
  ];
  const menu = useRef<Menu>(null);

  useEffect(() => {
    const fetchComment = async () => {
      try {
        const response = await CommentService.getInstance().getLstPitchTime(
          search,
          pitch_id.id,
          selectOrder?.type
        );
        const responseTotal = await CommentService.getInstance().getTotal(
          search,
          pitch_id.id
        );
        if (response.data.status == 200) {
          setLstComment(response.data.data);
          console.log(response.data);
        }
        if (responseTotal.data.status == 200) {
          setTotal(responseTotal.data.data);
        }
      } catch (error: any) {
        if (error.response) {
          console.log(error);
        } else if (error.request) {
          console.log(error.request);
        } else {
          console.log("Lỗi: ", error.message);
        }
      }
    };
    fetchComment();
  }, [search.timer, search.page]);

  const showSuccess = (message: string) => {
    toast.success("Thành công !", {
      position: "top-right",
    });
  };
  const showError = (message: string) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  const deleteComment = (commentId: number) => {
    swal("Bạn muốn xóa đánh giá này chứ?", {
      buttons: ["Quay lại", "Đồng ý"],
      icon: "warning",
      dangerMode: true,
    })
      .then(async (value) => {
        if (value) {
          await CommentService.getInstance()
            .DeleteComment(commentId)
            .then((response) => {
              showSuccess(response.data.message);
              handleChange();
            })
            .catch((response) => {
              showError(response.data.message);
            });
        }
        setSearch({
          ...search,
          timer: new Date().getTime(),
        });
      })
      .catch();
  };

  const OnMenu = (e: any, item: any) => {
    menu.current?.toggle(e);
    setSelectComment(item);
    return;
  };

  const items = [
    {
      label: "tùy chọn",
      icon: "pi-ellipsis-v",
      items: [
        {
          label: "Sửa đánh giá",
          icon: "pi pi-sync",
          command: () => {
            console.log(selectComment);
            setEditOn(true);
            setEditComment(
              new Comment(
                selectComment?.id,
                selectComment?.star,
                selectComment?.content,
                selectComment?.userId,
                selectComment?.pitchId
              )
            );
          },
        },
        {
          label: "Xóa đánh giá",
          icon: "pi pi-trash",
          command: () => {
            deleteComment(selectComment?.id);
          },
        },
      ],
    },
  ];

  return (
    <>
      <div className="container my-5 py-5">
        <ToastContainer />
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="card text-body">
              {user_id && (
                <AddAndUpdate
                  handleChange={() => handleChange()}
                  search={search}
                  setSearch={setSearch}
                  pitch_id={pitch_id}
                />
              )}
            </div>
            <br />
            {lstComment.length == 0 &&
            selectOption.select == "Tất cả đánh giá" ? (
              <h4 className="center">Chưa có đánh giá nào</h4>
            ) : (
              <>
                <div>
                  <h3 style={{ margin: "1%" }}> Các đánh giá khác</h3>
                  {user_id && (
                    <Dropdown
                      value={selectOption}
                      onChange={(e: DropdownChangeEvent) => {
                        setSelectOption(e.value);
                        setSearch({
                          ...search,
                          timer: new Date().getTime(),
                          keySearch: e.value.values,
                        });
                      }}
                      options={options}
                      optionLabel="select"
                      placeholder="Tất cả đánh giá"
                      style={{ width: "18%", margin: "2%" }}
                    ></Dropdown>
                  )}
                  <Dropdown
                    value={selectOrder}
                    onChange={(e: DropdownChangeEvent) => {
                      setSelectOrder(e.value);
                      setSearch({
                        ...search,
                        timer: new Date().getTime(),
                      });
                    }}
                    options={order}
                    optionLabel="name"
                    placeholder="Sắp xếp theo"
                    style={{ width: "15%", margin: "2%" }}
                  ></Dropdown>
                </div>
                {lstComment.length == 0 &&
                selectOption.select == "Đánh giá của bạn" ? (
                  <div className="center">
                    <h5>Bạn chưa có comment nào</h5>
                  </div>
                ) : (
                  <>
                    <div className="card text-body">
                      {lstComment.map((item: any) => {
                        return (
                          <div key={item.id}>
                            <div className="card-body p-4">
                              <div className="d-flex">
                                <Image
                                  className="rounded-circle shadow-1-strong me-3"
                                  src={
                                    process.env.REACT_APP_API_URL +
                                    `/image/${item?.avatar}`
                                  }
                                  onError={(e) => {
                                    (e.target as HTMLImageElement).src =
                                      defaultAvatar;
                                  }}
                                  alt="avatar"
                                  width="60"
                                  height="60"
                                />

                                <div>
                                  <h6 className="fw-bold mb-1">
                                    {item.fullname}
                                  </h6>
                                  <div className="d-flex align-items-center mb-3">
                                    <p className="mb-0">
                                      {dayjs(item.updateAt).format(
                                        "DD/MM/YYYY"
                                      )}
                                    </p>
                                  </div>
                                  <div>
                                    <Rating
                                      value={item.star}
                                      cancel={false}
                                      className="custom-rating"
                                    />
                                  </div>
                                  <p className="mb-0">{item.content}</p>
                                </div>
                                {item.userId == user_id && (
                                  <div className="ms-auto">
                                    <Avatar
                                      icon="pi pi-ellipsis-v"
                                      shape="circle"
                                      onClick={(e) => OnMenu(e, item)}
                                      style={{ backgroundColor: "white" }}
                                    />
                                    <i></i>
                                    <Menu
                                      model={items}
                                      style={{ width: "14rem" }}
                                      popup
                                      baseZIndex={1000}
                                      ref={menu}
                                    ></Menu>
                                  </div>
                                )}
                              </div>
                            </div>
                            <hr className="my-0" />
                          </div>
                        );
                      })}

                      <Dialog
                        header="Cập nhật"
                        visible={editOn}
                        style={{ width: "50vw" }}
                        onHide={() => {
                          if (!editOn) return;
                          setEditOn(false);
                        }}
                      >
                        <AddAndUpdate
                          handleChange={() => handleChange()}
                          search={search}
                          setSearch={setSearch}
                          editComment={editComment}
                          setEditOn={setEditOn}
                          pitch_id={pitch_id}
                        />
                      </Dialog>
                    </div>
                    <div
                      className={`center ${total < search.limit ? "hide" : ""}`}
                    >
                      <Button
                        icon="pi pi-plus"
                        label="Xem thêm"
                        onClick={(e) => {
                          setSearch({
                            ...search,
                            limit: search.limit + 3,
                            timer: new Date().getTime(),
                          });
                        }}
                        style={{ margin: "1%" }}
                      />
                    </div>
                  </>
                )}
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
