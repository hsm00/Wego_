while inotifywait -r -e modify,create,delete .; do
	npm run build:css
done
