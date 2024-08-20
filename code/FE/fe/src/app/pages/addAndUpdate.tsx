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

export default function AddAndUpdate(props: any) {
  const { search, setSearch, editComment, setEditOn, pitch_id } = props;

  const [value, setValue] = useState(
    editComment != null ? editComment.content : ""
  );
  const [rating, setRating] = useState<number>(
    editComment == null ? 0 : editComment.star
  );

  const user_id = decodeToken<DecodedToken>(
    TokenService.getInstance().getToken()
  )?.user_id;

  const toast = useRef<Toast>(null);

  const showSuccess = (message: any) => {
    toast.current?.show({
      severity: "success",
      summary: "Success",
      detail: "Success",
      life: 3000,
    });
  };
  const showError = (message: any) => {
    toast.current?.show({
      severity: "error",
      summary: "Error",
      detail: `${message}`,
      life: 3000,
    });
  };

  const addComment = async (e: any) => {
    if (editComment == null) {
      await CommentService.getInstance()
        .AddComment(new Comment(undefined, rating, value, user_id, pitch_id.id))
        .then((response) => {
          showSuccess(response.status);
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
      swal("Bạn muốn cập nhật tượng này chứ?", {
        buttons: ["Quay lại", "Đồng ý"],
        icon: "warning",
        dangerMode: true,
      }).then(async (vl) => {
        if (vl) {
          await CommentService.getInstance()
            .Update(new Comment(editComment.id, rating, value, user_id, pitch_id.id))
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
        <Toast ref={toast} />
        <h3 style={{ margin: "1%" }}>Đánh Giá</h3>
        <Rating
          value={rating}
          onChange={(e: RatingChangeEvent) => setRating(e.value ?? 0)}
          cancel={false}
          style={{ margin: "1%" }}
        />
        <div>
          <InputText
            value={value}
            onChange={(e) => setValue(e.target.value)}
            style={{ width: "95%", margin: "1%" }}
          />
          <Button
            label="Submit"
            style={{ left: "85%", margin: "1%" }}
            onClick={addComment}
          />
        </div>
      </div>
    </>
  );
}
