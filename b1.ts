/*
    Đề bài:
Định nghĩa lớp Student có các thuộc tính id, name và enrolledCourses. enrolledCourses là một mảng các khóa mà sinh viên đang theo học.

Định nghĩa lớp Instructor có các thuộc tính id, name.

Định nghĩa lớp Course có các thuộc tính title, instructor, lessons là mảng các bài học trong khóa học, 
Assesment là mảng các bài kiểm tra trong khóa học. Mỗi bài kiểm tra đơn giản là một chuỗi để đại diện

Định nghĩa lớp lesson có các thuộc tính title, asignments là mảng các bài tập trong bài học. Mỗi bài tập đơn giản là một chuỗi để đại diện.

Xây dựng phương thức enroll cho lớp Student để cho sinh viên đăng ký khóa học.

Lớp Instructor sẽ có các phương thức createCourse để tạo khóa học, createLesson để tạo các bài cho khóa học, 
createAsignment để tạo các bài tập cho bài học và createAssesment để tạo bài kiểm tra cho khóa học.

Tiến hành xây dựng các lớp và tạo ra các thực thể tương ứng để kiểm tra.
*/


class SinhVien {
    constructor(
        protected id: number,
        protected name: string,
        public khoaHocSinhVienTheoHoc: KhoaHoc[]
    ) {
        this.id = id;
        this.name = name;
        this.khoaHocSinhVienTheoHoc = khoaHocSinhVienTheoHoc; 
    }

    dangKyKhoaHoc(khoaHoc: KhoaHoc): void {
        this.khoaHocSinhVienTheoHoc.push(khoaHoc);
    }
}

class GiaoVien {
    constructor(
        protected id: number,
        protected name: string
    ) {
        this.id = id;
        this.name = name;
    }

    taoKhoaHoc(tieuDe: string, instructor: string): KhoaHoc {
        return new KhoaHoc(tieuDe, instructor, [], []);
    }

    taoBaiHoc(tieuDe: string, baiTapVeNha: string[]): BaiHoc {
        return new BaiHoc(tieuDe, baiTapVeNha);
    }

    taoBaiTap(baiHoc: BaiHoc, baiTap: string): void {
        baiHoc.themBaiTap(baiTap);
    }

    taoBaiKiemTra(khoaHoc: KhoaHoc, baiKiemTra: string): void {
        khoaHoc.themBaiKiemTra(baiKiemTra); 
    } 
}

class KhoaHoc {
    constructor(
        protected tieuDe: string,
        protected giangVien: string,
        protected baiHocs: BaiHoc[],
        protected baiKiemTras: string[]
    ) {
        this.tieuDe = tieuDe;
        this.giangVien = giangVien;
        this.baiHocs = baiHocs;
        this.baiKiemTras = baiKiemTras;
    }

    themBaiKiemTra(baiKiemTra: string): void {
        this.baiKiemTras.push(baiKiemTra);
    }
}

class BaiHoc {
    constructor(
        protected tieuDe: string,
        protected baiTapVeNha: string[]
    ) {
        this.tieuDe = tieuDe;
        this.baiTapVeNha = baiTapVeNha;
    }

    themBaiTap(baiTap: string): void {
        this.baiTapVeNha.push(baiTap);
    }
}

// Tạo các thực thể để kiểm tra
let giaoVien = new GiaoVien(1, "John Doe");
let khoaHoc = giaoVien.taoKhoaHoc("JavaScript Cơ Bản", "Quốc Hai");

let baiHoc1 = giaoVien.taoBaiHoc("Giới Thiệu về JavaScript", []);
baiHoc1.themBaiTap("Biến và Kiểu Dữ Liệu"); 
baiHoc1.themBaiTap("Hàm");

let baiHoc2 = giaoVien.taoBaiHoc("Luồng Kiểm Soát", []);
baiHoc2.themBaiTap("Câu Lệnh Điều Kiện");
baiHoc2.themBaiTap("Vòng Lặp");

giaoVien.taoBaiKiemTra(khoaHoc, "Kiểm Tra Cuối Khoá");

let sinhVienMoi = new SinhVien(1, "Quang", []);
sinhVienMoi.dangKyKhoaHoc(khoaHoc);

console.log(sinhVienMoi.khoaHocSinhVienTheoHoc);