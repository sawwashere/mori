start_mori() {
	./node_modules/babel-cli/bin/babel-node.js --presets node6 ./bin/index.js &>> output.txt
}

echo "Starting mori"
start_mori

while [ -e autostart.stamp ] ; do
    echo "If you want to completely stop mori, press Ctrl+C before the time is up!"
    for i in 10 9 8 7 6 5 4 3 2 1; do
        echo "Restarting mori in $i"
        sleep 1
    done
    echo "Rebooting now!"
    start_mori
    echo "mori process finished"
done

