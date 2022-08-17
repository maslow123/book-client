buildfe:
	yarn run build
	docker-compose build fe
	docker-compose push fe
runapp:
	docker-compose -f ./docker-compose.yaml up -d --force-recreate fe