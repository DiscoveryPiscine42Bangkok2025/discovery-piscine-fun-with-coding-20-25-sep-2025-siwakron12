if [ $# -eq 0 ]; then
    echo "No arguments supplied"
else
    # Loop over all arguments
    for arg in "$@"
    do
        dir="ex$arg"
        mkdir -p "$dir"  # -p เพื่อไม่ให้ error ถ้าโฟลเดอร์มีอยู่แล้ว
    done
fi