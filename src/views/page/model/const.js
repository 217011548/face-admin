import { richTextFormat } from "@/utils/index";
//productTableColumns
export const bannerColumns = ctx => {
  return [
    {
      prop: "id",
      label: "ID"
    },
    {
      prop: "url",
      label: "Icon",
      minWidth: 200,
      render: (h, row) => {
        return <img src={row.url} class="h80" />;
      }
    },
    {
      prop: "remark",
      label: "remark",
      minWidth: 120
    },
    {
      button: true,
      label: "control",
      fixed: "right",
      toolTip: false,
      width: 180,
      render: (h, row) => {
        return [
          <el-link
            underline={false}
            type="primary"
            class="mr10"
            onClick={() => {
              ctx.onEdit(row);
            }}
          >
            Edit
          </el-link>,
          <el-link
            underline={false}
            type="danger"
            class="mr10"
            onClick={() => {
              ctx.onDel(row);
            }}
          >
            Delete
          </el-link>
        ];
      }
    }
  ];
};

export const giftColumns = ctx => {
  return [
    {
      prop: "id",
      label: "ID"
    },
    {
      prop: "name",
      label: "Gift name",
      minWidth: 120
    },
    {
      prop: "score",
      label: "score",
      minWidth: 120
    },
    {
      prop: "createTime",
      label: "Create Time",
      minWidth: 150
    },
    {
      button: true,
      label: "Control",
      fixed: "right",
      toolTip: false,
      width: 180,
      render: (h, row) => {
        return [
          <el-link
            underline={false}
            type="primary"
            class="mr10"
            onClick={() => {
              ctx.onEdit(row);
            }}
          >
            Edit
          </el-link>,
          <el-link
            underline={false}
            type="danger"
            class="mr10"
            onClick={() => {
              ctx.onDel(row);
            }}
          >
            Delete
          </el-link>
        ];
      }
    }
  ];
};
/**
 * management page
 * @param {*} this
 * @returns
 */
export const couponColumns = ctx => {
  return [
    {
      prop: "id",
      label: "ID"
    },
    {
      prop: "articleTypeName",
      label: "Article Type",
      minWidth: 120
    },
    {
      prop: "title",
      label: "Title",
      minWidth: 120
    },
    {
      prop: "author",
      label: "Author",
      minWidth: 120
    },
    {
      prop: "indexTypeName",
      label: "Article Index",
      minWidth: 120
    },
    {
      prop: "img",
      label: "Image",
      minWidth: 200,
      render: (h, row) => {
        return <img src={row.img} class="h80" />;
      }
    },
    {
      prop: "content",
      label: "Content",
      minWidth: 180,
      render: (h, row) => {
        return <div class="ell2">{richTextFormat(row.content)}</div>;
      }
    },
    {
      prop: "shortContent",
      label: "Short Content",
      minWidth: 150
    },
    {
      prop: "createTime",
      label: "Create Time",
      minWidth: 150
    },
    {
      button: true,
      label: "Control",
      fixed: "right",
      toolTip: false,
      width: 180,
      render: (h, row) => {
        return [
          <el-link
            underline={false}
            type="primary"
            class="mr10"
            onClick={() => {
              ctx.onEdit(row);
            }}
          >
            Edit
          </el-link>,
          <el-link
            underline={false}
            type="danger"
            class="mr10"
            onClick={() => {
              ctx.onDel(row);
            }}
          >
            Delete
          </el-link>
        ];
      }
    }
  ];
};

export const contacatinfo = ctx => {
  return [
    {
      prop: "id",
      label: "ID"
    },
    {
      prop: "articleTypeName",
      label: "Article Type",
      minWidth: 120
    },
    {
      prop: "title",
      label: "Title",
      minWidth: 120
    },
    {
      prop: "author",
      label: "Author",
      minWidth: 120
    },
    {
      prop: "img",
      label: "image",
      minWidth: 200,
      render: (h, row) => {
        return <img src={row.img} class="h80" />;
      }
    },
    {
      prop: "content",
      label: "Content",
      minWidth: 180,
      render: (h, row) => {
        return <div class="ell2">{richTextFormat(row.content)}</div>;
      }
    },
    {
      prop: "shortContent",
      label: "Short Content",
      minWidth: 150
    },
    {
      prop: "createTime",
      label: "Create Time",
      minWidth: 150
    },
    {
      button: true,
      label: "Control",
      fixed: "right",
      toolTip: false,
      width: 180,
      render: (h, row) => {
        return [
          <el-link
            underline={false}
            type="primary"
            class="mr10"
            onClick={() => {
              ctx.onEdit(row);
            }}
          >
            Edit
          </el-link>,
          <el-link
            underline={false}
            type="danger"
            class="mr10"
            onClick={() => {
              ctx.onDel(row);
            }}
          >
            Delete
          </el-link>
        ];
      }
    }
  ];
};

export const orderColumns = ctx => {
  return [
    {
      prop: "orderNo",
      label: "Order No"
    },

    {
      prop: "num",
      label: "Number"
    },
    {
      prop: "price",
      label: "Price"
    },

    {
      prop: "id",
      label: "Order ID"
    },
    {
      prop: "goodsId",
      label: "Item ID"
    },
    {
      prop: "miniUserId",
      label: "User ID",
      minWidth: 150
    },
    {
      prop: "createTime",
      minWidth: 150,
      label: "Order create time"
    }
  ];
};
