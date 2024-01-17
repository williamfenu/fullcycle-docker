FROM golang:latest as builder

WORKDIR /app

RUN go mod init example/hello-full-cycle

COPY app/hello.go .

RUN go build hello.go

FROM scratch

COPY --from=builder app/hello .

CMD ["./hello"]