package core

type PostaliApiRestError struct {
	IsPostaliApiRestError bool
	Sdk              string
	Code             string
	Msg              string
	Ctx              *Context
	Result           any
	Spec             any
}

func NewPostaliApiRestError(code string, msg string, ctx *Context) *PostaliApiRestError {
	return &PostaliApiRestError{
		IsPostaliApiRestError: true,
		Sdk:              "PostaliApiRest",
		Code:             code,
		Msg:              msg,
		Ctx:              ctx,
	}
}

func (e *PostaliApiRestError) Error() string {
	return e.Msg
}
