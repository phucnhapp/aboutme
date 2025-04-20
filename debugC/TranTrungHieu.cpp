#include <iostream>
using namespace std;

// Hàm tính Ước chung lớn nhất
int ucln(int a, int b) {
    while (b != 0) {
        int r = a % b;
        a = b;
        b = r;
    }
    return a;
}

// Hàm hiển thị ước chung
void hienThiUocChung(int a, int b) {
    int min = (a < b) ? a : b;
    cout << "Uoc so chung cua " << a << " va " << b << " la: ";
    for (int i = 1; i <= min; i++) {
        if (a % i == 0 && b % i == 0) {
            cout << i << " ";
        }
    }
    cout << "\nUoc chung lon nhat: " << ucln(a, b) << endl;
}

// Hàm kiểm tra số hoàn thiện
bool soHoanThien(int n) {
    int tong = 0;
    for (int i = 1; i < n; i++) {
        if (n % i == 0) tong += i;
    }
    return tong == n;
}

// Liệt kê số hoàn thiện trong khoảng
void lietKeSoHoanThien(int a, int b) {
    cout << "Cac so hoan thien trong khoang (" << b << ", " << a << "): ";
    for (int i = b + 1; i < a; i++) {
        if (soHoanThien(i)) cout << i << " ";
    }
    cout << endl;
}

// Kiểm tra số nguyên tố
bool laSoNguyenTo(int n) {
    if (n < 2) return false;
    for (int i = 2; i * i <= n; i++) {
        if (n % i == 0) return false;
    }
    return true;
}

// Kiểm tra a và b có phải số nguyên tố
void kiemTraNguyenTo(int a, int b) {
    cout << a << (laSoNguyenTo(a) ? " la " : " khong la ") << "so nguyen to." << endl;
    cout << b << (laSoNguyenTo(b) ? " la " : " khong la ") << "so nguyen to." << endl;
}

// Liệt kê số nguyên tố trong khoảng a, b
void lietKeNguyenToTrongKhoang(int a, int b) {
    cout << "Cac so nguyen to trong khoang (" << a << ", " << b << "): ";
    int min = (a < b) ? a : b;
    int max = (a > b) ? a : b;
    for (int i = min + 1; i < max; i++) {
        if (laSoNguyenTo(i)) cout << i << " ";
    }
    cout << endl;
}

// Tính giai thừa
long long giaithua(int n) {
    if (n == 0 || n == 1) return 1;
    long long gt = 1;
    for (int i = 2; i <= n; i++) gt *= i;
    return gt;
}

// Tính tổng biểu thức S
double tinhTongS(int a, int b, int n) {
    double S = 0.0;
    for (int i = 1; i <= n; i++) {
        double term = (a + i) / (double)(giaithua(b) / i);
        if (i % 2 == 0) S -= term;
        else S += term;
    }
    return S;
}

int main() {
    int a, b;
    cout << "Nhap a: "; cin >> a;
    cout << "Nhap b: "; cin >> b;

    hienThiUocChung(a, b);
    lietKeSoHoanThien(a, b);
    kiemTraNguyenTo(a, b);
    lietKeNguyenToTrongKhoang(a, b);

    int n;
    cout << "Nhap n: "; cin >> n;
    cout << "Tong S = " << tinhTongS(a, b, n) << endl;

    return 0;
}
