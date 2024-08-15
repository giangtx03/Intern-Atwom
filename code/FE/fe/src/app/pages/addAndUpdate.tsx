import { Button } from "primereact/button";
import { InputText } from "primereact/inputtext";
import React, { useEffect, useRef, useState } from "react";
import { FaStar } from "react-icons/fa";
import CommentService from "../service/CommentService";
import Comment from "../model/Comment";
import { Toast } from "primereact/toast";
import { useAppSelector } from "../store/hooks";

export default function AddAndUpdate(props: any) {
  const { search, setSearch, editComment, setEditOn } = props;

  const [value, setValue] = useState(
    editComment != null ? editComment.content : ""
  );
  const [rating, setRating] = useState<number>(
    editComment != null ? editComment.star : 0
  );
  const [hover, setHover] = useState<number>(0);

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
        .AddComment(new Comment(0, rating, value, 1, 1))
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
      await CommentService.getInstance()
        .Update(new Comment(editComment.id, rating, value, 1, 1))
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
    }
  };
  return (
    <>
        <div>
          <Toast ref={toast} />
          <h3 style={{ margin: "1%" }}>Đánh Giá</h3>
          {[...Array(5)].map((star, index) => {
            const currentRating = index + 1;
            return (
              <label>
                <input
                  type="radio"
                  name="rating"
                  value={currentRating}
                  onClick={() => {
                    setRating(currentRating);
                  }}
                />
                <FaStar
                  size={20}
                  className="star"
                  color={currentRating <= (hover || rating) ? "yellow" : "grey"}
                  onMouseEnter={() => {
                    setHover(currentRating);
                  }}
                  onMouseLeave={() => {
                    setHover(0);
                  }}
                />
              </label>
            );
          })}
          <div>
            <InputText
              value={value}
              onChange={(e) => setValue(e.target.value)}
              style={{ width: "95%", margin: "1%" }}
            />
            <Button
              label="Submit"
              style={{ left: "85%" }}
              onClick={addComment}
            />
          </div>
        </div>
    </>
  );
}
