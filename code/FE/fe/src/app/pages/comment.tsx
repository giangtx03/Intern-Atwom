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

export default function CommentDisplay(props: any) {
  const { pitch_id } = props;
  const [lstComment, setLstComment] = useState([]);
  const [search, setSearch] = useState(new Search("", 3, 1, 1, 100));
  const [editOn, setEditOn] = useState<boolean>(false);
  const [editComment, setEditComment] = useState<Comment | undefined>(
    undefined
  );
  const [total, setTotal] = useState<number>(0);

  const toast = useRef<Toast>(null);

  useEffect(() => {
    const fetchComment = async () => {
    try {
      const response = await CommentService.getInstance().getLstPitchTime(
        search,
        1
      );
      const responseTotal = await CommentService.getInstance().getTotal(1);
      if (response.data.status == "OK") {
        setLstComment(response.data.data);
      }
      if(responseTotal.data.status == "OK"){
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
  }, [search.timer,search.page]);

  const showSuccess = () => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Success",
      life: 3000,
    });
  };
  const showError = () => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: "Message Content",
      life: 3000,
    });
  };

  const deleteComment = (e: any, commentId: number) => {
    swal("Bạn muốn cập nhật tượng này chứ?", {
      buttons: ["Quay lại", "Đồng ý"],
      icon: "warning",
      dangerMode: true,
    }).then(async (value) => {
       if(value){
           await CommentService.getInstance()
             .DeleteComment(commentId)
             .then(showSuccess)
             .catch(showError);
       }
      setSearch({
        ...search,
        timer: new Date().getTime(),
      });
    }).catch(showError);
  };

  return (
    <>
      <div className="container my-5 py-5">
        <Toast ref={toast} />
        <div className="row d-flex justify-content-center">
          <div className="col-md-12 col-lg-10">
            <div className="card text-body">
              <AddAndUpdate
                search={search}
                setSearch={setSearch}
              ></AddAndUpdate>
            </div>
            <br />
            <div>
              <h3 style={{ margin: "1%" }}> Các đánh giá khác</h3>
              <select
                className="form-select"
                aria-label="Default select example"
                onChange={(e) => {
                  setSearch({
                    ...search,
                    timer: new Date().getTime(),
                    keySearch: e.target.value,
                  });
                }}
                style={{ margin: "1%" }}
              >
                <option selected value="">
                  Tất cả comment
                </option>
                <option value="1">Comment của bạn</option>
              </select>
            </div>
            <div className="card text-body">
              {lstComment.map((item: any) => {
                return (
                  <>
                    <div className="card-body p-4">
                      <div className="d-flex flex-start">
                        <Image
                          className="rounded-circle shadow-1-strong me-3"
                          src="https://mdbcdn.b-cdn.net/img/Photos/Avatars/img%20(23).webp"
                          alt="avatar"
                          width="60"
                          height="60"
                        />
                        <div>
                          <h6 className="fw-bold mb-1">{item.fullname}</h6>
                          <div className="d-flex align-items-center mb-3">
                            <p className="mb-0">
                              {dayjs(item.createAt).format("DD/MM/YYYY")}
                            </p>
                          </div>
                          <div>
                            {[...Array(5)].map((_, index) => {
                              if (index < item.star) {
                                return <FaStar size={20} color="yellow" />;
                              }
                              return <FaStar size={20} color="grey" />;
                            })}
                          </div>
                          <p className="mb-0">{item.content}</p>
                        </div>
                      </div>
                    </div>
                    {item.userId == 1 && (
                      <div>
                        <Button
                          label="Delete"
                          severity="danger"
                          style={{ left: "70%" ,margin:"1%"}}
                          onClick={(e) => {
                            deleteComment(e, item.id);
                          }}
                        />
                        <Button
                          label="Update"
                          severity="success"
                          style={{ left: "70%" ,margin:"1%" }}
                          onClick={(e) => {
                            setEditOn(true);
                            setEditComment(
                              new Comment(
                                item.id,
                                item.star,
                                item.content,
                                item.userId,
                                item.pitchId
                              )
                            );
                          }}
                        />
                      </div>
                    )}
                    <hr className="my-0" />
                  </>
                );
              })}
              <Dialog
                header="Update"
                visible={editOn}
                style={{ width: "50vw" }}
                onHide={() => {
                  if (!editOn) return;
                  setEditOn(false);
                }}
              >
                <AddAndUpdate
                  search={search}
                  setSearch={setSearch}
                  editComment={editComment}
                  setEditOn={setEditOn}
                />
              </Dialog>
            </div>
          </div>
        </div>
        <div className="center">
        <button
          className="btn btn-secondary"
          onClick={() => {
            if (search.page > 1) {
              setSearch({
                ...search,
                page: search.page - 1,
                timer: new Date().getTime(),
              });
            }
          }}
        >
          Pre
        </button>
        <span>{search.page}</span>
        <button
          className="btn btn-dark"
          onClick={() => {
            if (search.page <= total/search.limit -1) {
              setSearch({
                ...search,
                page: search.page + 1,
                timer: new Date().getTime(),
              });
            }
          }}
        >
          Next
        </button>
      </div>
      </div>
    </>
  );
}
