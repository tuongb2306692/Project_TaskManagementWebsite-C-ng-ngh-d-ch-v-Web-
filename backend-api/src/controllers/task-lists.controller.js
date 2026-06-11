// Hàm lấy danh sách tất cả Task Lists
function getLists(req, res) {
    return res.json({
        success: true,
        message: 'Get lists successfully',
        user: req.user,
    });
}


// Hàm lấy thông tin 1 Task List
async function getList(req, res, next) {
    return res.status(200).json({ message: "getList working!" });
}

// Hàm tạo mới Task List
async function createList(req, res, next) {
    return res.status(201).json({ message: "createList working!" });
}

// Hàm cập nhật Task List
async function updateList(req, res, next) {
    return res.status(200).json({ message: "updateList working!" });
}

// Hàm xóa Task List
async function deleteList(req, res, next) {
    return res.status(200).json({ message: "deleteList working!" });
}

// Xuất các hàm ra với tên chuẩn khớp với file Router
module.exports = {
    getLists,
    getList,
    createList,
    updateList,
    deleteList,
};