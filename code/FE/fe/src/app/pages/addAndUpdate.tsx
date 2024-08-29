import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import CommentService from "../service/CommentService";
import Comment from "../model/Comment";
import swal from "sweetalert";
import { Toast } from "primereact/toast";
import { useAppSelector } from "../store/hooks";
import { Rating, RatingChangeEvent } from "primereact/rating";
import { TokenService } from "../service/TokenService";
import { decodeToken } from "react-jwt";
import { DecodedToken } from "../model/User";
import { ToastContainer, toast, ToastPosition } from "react-toastify";

export default function AddAndUpdate(props: any) {
  const { search, setSearch, editComment, setEditOn, pitch_id, handleChange } = props;

  const [value, setValue] = useState(
    editComment != null ? editComment.content : ""
  );
  const [rating, setRating] = useState<number>(
    editComment == null ? 0 : editComment.star
  );

  const user_id = decodeToken<DecodedToken>(
    TokenService.getInstance().getToken()
  )?.user_id;

  const showSuccess = (message: any) => {
    toast.success("Thành công !", {
      position: "top-right",
    });
  };
  const showError = (message: any) => {
    toast.error(message, {
      position: "top-right",
    });
  };

  const addComment = async (e: any) => {
    if (editComment == null) {
      await CommentService.getInstance()
        .AddComment(new Comment(undefined, rating, value, user_id, pitch_id.id))
        .then((response) => {
          showSuccess(response.status);
          handleChange();
        })
        .catch((response) => {
          showError(response.response.data.message);
        });
      setRating(0);
      setValue("");
      setSearch({
        ...search,
        timer: new Date().getTime(),
        page: 1,
      });
    } else {
      swal("Bạn muốn cập nhật đánh giá này chứ?", {
        buttons: ["Quay lại", "Đồng ý"],
        icon: "warning",
        dangerMode: true,
      }).then(async (vl) => {
        if (vl) {
          await CommentService.getInstance()
            .Update(
              new Comment(editComment.id, rating, value, user_id, pitch_id.id)
            )
            .then(showSuccess)
            .catch(showError);
          setRating(0);
          setValue("");
          setSearch({
            ...search,
            timer: new Date().getTime(),
            page: 1,
          });
          setEditOn(false);
          handleChange();
        } else {
          setSearch({
            ...search,
            timer: new Date().getTime(),
            page: 1,
          });
          setEditOn(false);
        }
      });
    }
  };
  return (
    <>
      <div>
        <h3 style={{ margin: "1%" }}>Đánh Giá</h3>
        <Rating
          value={rating}
          onChange={(e: RatingChangeEvent) => setRating(e.value ?? 0)}
          cancel={false}
          style={{ margin: "1%"}}
          className="custom-rating"
        />
        <div>
          <InputText
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "95%", margin: "1%" }}
            placeholder="Ghi chú"
          />
          <Button
            label="Xác nhận"
            style={{ left: "80%", margin: "1%" }}
            onClick={addComment}
          />
        </div>
      </div>
    </>
  );
}
