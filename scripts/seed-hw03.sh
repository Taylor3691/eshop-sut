#!/bin/bash
# Tạo đơn hàng mẫu ở trạng thái pending (bằng tài khoản test) để dùng cho bước
# "Cập nhật trạng thái đơn hàng" trong Task 1/Task 2. Chạy sau start-sut.sh.
# Dùng: scripts/seed-hw03.sh [số_đơn]   (mặc định 3)
API=http://localhost:3000/api; N=${1:-3}
TOKEN=$(curl -s -X POST $API/login -H 'Content-Type: application/json' \
  -d '{"email":"test@eshop.com","password":"Test1234!"}' | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>console.log(JSON.parse(s).token||""))')
[ -z "$TOKEN" ] && { echo "Đăng nhập test user thất bại"; exit 1; }
ADDRS=("12 Nguyễn Huệ, Q.1, TP.HCM" "45 Lê Lợi, Q.1, TP.HCM" "8 Trần Hưng Đạo, Hà Nội" "101 Hai Bà Trưng, Đà Nẵng" "7 Lý Thường Kiệt, Huế")
for i in $(seq 1 $N); do
  P=$(curl -s $API/products | node -e "let s='';process.stdin.on('data',d=>s+=d).on('end',()=>{const a=JSON.parse(s);const p=a[($i-1)%a.length];console.log(JSON.stringify({id:p.id,name:p.name,price:p.price,quantity:$i}))})")
  curl -s -X POST $API/cart -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' -d "$P" >/dev/null
  TOTAL=$(echo "$P" | node -e 'let s="";process.stdin.on("data",d=>s+=d).on("end",()=>{const p=JSON.parse(s);console.log(p.price*p.quantity)})')
  ADDR=${ADDRS[$(( (i-1) % 5 ))]}
  R=$(curl -s -X POST $API/checkout -H "Authorization: Bearer $TOKEN" -H 'Content-Type: application/json' \
      -d "{\"total_amount\":$TOTAL,\"shipping_address\":\"$ADDR\"}")
  echo "Đơn $i: $R"
done
