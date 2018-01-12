build:
	gcloud docker -- pull $$(grep '^FROM' Dockerfile | grep -o ' .*' | tr -d ' ')
	docker-compose build

test:
	docker-compose up web
	docker-compose exec web yarn test:parallel
	docker-compose down web
	@utils/publish-test-artifacts

publish:
	@utils/publish
